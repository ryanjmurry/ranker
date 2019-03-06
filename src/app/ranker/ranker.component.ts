import { Component, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { NbaService } from '../services/nba.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-ranker',
  templateUrl: './ranker.component.html',
  styleUrls: ['./ranker.component.scss']
})
export class RankerComponent implements OnInit {
  loading: boolean = false;
  playerIdList: string[] = [];
  playerList: Player[] = [];

  constructor(private nbaService: NbaService) {}

  ngOnInit() {
    this.loading = true;
    if (localStorage.getItem('playerIdArr')) {
      this.playerIdList = JSON.parse(localStorage.getItem('playerIdArr'));
    } else
      this.nbaService.getAllPlayers().subscribe(data => {
        data.forEach(doc => {
          this.playerIdList.push(doc.payload.doc.id);
        });
        localStorage.setItem('playerIdArr', JSON.stringify(this.playerIdList));
      });

    this.beginRanking();
  }

  beginRanking() {
    this.loading = true;
    this.getNewPlayers();
  }

  getNewPlayers(): void {
    let id1: string;
    let id2: string;
    do {
      id1 = this.randomPlayerId();
      id2 = this.randomPlayerId();
    } while (id1 === id2);
    this.fetchNewPlayers(id1, id2);
  }

  fetchNewPlayers(id1: string, id2: string) {
    forkJoin(this.nbaService.getPlayer(id1), this.nbaService.getPlayer(id2)).subscribe(
      ([p1, p2]) => {
        this.playerList.push(p1);
        this.playerList.push(p2);
        console.log(this.playerList);
        this.loading = false;
      }
    );
  }

  randomPlayerId(): string {
    return this.playerIdList[Math.floor(Math.random() * this.playerIdList.length)];
  }
}
