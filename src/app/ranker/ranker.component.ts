import { Component, OnInit } from '@angular/core';
import { Player } from '../player.model';
import { NbaService } from '../services/nba.service';
import { merge, combineLatest } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-ranker',
  templateUrl: './ranker.component.html',
  styleUrls: ['./ranker.component.scss']
})
export class RankerComponent implements OnInit {
  loadingInitialData: boolean = false;
  loadingPlayerData: boolean = false;
  begunRanking: boolean = false;
  player1: Player;
  player2: Player;
  playerIdList: string[] = [];
  playerList: object[] = [];

  constructor(private nbaService: NbaService) {}

  ngOnInit() {
    if (localStorage.getItem('playerIdArr')) {
      this.playerIdList = JSON.parse(localStorage.getItem('playerIdArr'));
      this.loadingInitialData = false;
    } else
      this.nbaService.getAllPlayers().subscribe(data => {
        this.loadingInitialData = true;
        data.forEach(doc => {
          this.playerIdList.push(doc.payload.doc.id);
        });
        localStorage.setItem('playerIdArr', JSON.stringify(this.playerIdList));
        this.loadingInitialData = false;
      });
  }

  handleBeginRanking() {
    this.begunRanking = true;
    this.getNewPlayers();
  }

  getNewPlayers(): void {
    this.loadingPlayerData = true;
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
        this.player1 = p1;
        this.player2 = p2;
        this.loadingPlayerData = false;
      }
    );
  }

  randomPlayerId(): string {
    return this.playerIdList[Math.floor(Math.random() * this.playerIdList.length)];
  }
}
