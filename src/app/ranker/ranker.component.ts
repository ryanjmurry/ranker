import { Component, OnInit, OnDestroy } from '@angular/core';
import { Player } from '../player.model';
import { NbaService } from '../services/nba.service';
import { forkJoin } from 'rxjs';
import { IDLIST } from './id-list';

@Component({
  selector: 'app-ranker',
  templateUrl: './ranker.component.html',
  styleUrls: ['./ranker.component.scss']
})
export class RankerComponent implements OnInit, OnDestroy {
  audio = new Audio('../../assets/ranker-audio.mp3');
  loading: boolean = true;
  audioIsPlaying: boolean = false;
  playerIdList: string[] = IDLIST;
  playerList: Player[] = [];

  constructor(private nbaService: NbaService) {}

  ngOnInit() {
    this.audio.loop = true;
    this.audio.currentTime = 8;
    this.handleAudio();
    this.beginRanking();
  }

  beginRanking(): void {
    this.loading = true;
    this.getNewPlayers();
  }

  getNewPlayers(): void {
    this.playerList = [];
    let id1: string;
    let id2: string;
    do {
      id1 = this.randomPlayerId();
      id2 = this.randomPlayerId();
    } while (id1 === id2);
    this.fetchNewPlayers(id1, id2);
  }

  fetchNewPlayers(id1: string, id2: string): void {
    forkJoin(this.nbaService.getPlayer(id1), this.nbaService.getPlayer(id2)).subscribe(
      ([p1, p2]) => {
        this.playerList.push(p1);
        this.playerList.push(p2);
        console.log(this.playerList);
        this.loading = false;
      }
    );
  }

  submitRanking(playerId: string) {
    this.loading = true;
    const winner = this.playerList.find(player => player.mfsId === playerId);
    const loser = this.playerList.find(player => player.mfsId !== playerId);
    winner.wins++;
    loser.losses++;
    this.playerList.forEach(player => {
      this.calculteWinPercentage(player);
    });
    forkJoin(
      this.nbaService.setPlayer(this.playerList[0]),
      this.nbaService.setPlayer(this.playerList[1])
    ).subscribe(() => {
      this.getNewPlayers();
      this.loading = false;
    });
  }

  calculteWinPercentage(player: Player) {
    const wins = player.wins;
    const totalGames = player.wins + player.losses;
    player.winPercentage = parseFloat(((wins / totalGames) * 100).toFixed(2));
  }

  randomPlayerId(): string {
    return this.playerIdList[Math.floor(Math.random() * this.playerIdList.length)];
  }

  getPlayerPosition(pos: string): string {
    switch (pos) {
      case 'PG':
        return 'Point Guard';
        break;
      case 'SG':
        return 'Shooting Guard';
        break;
      case 'G':
        return 'Guard';
        break;
      case 'F':
        return 'Forward';
        break;
      case 'SF':
        return 'Small Forward';
        break;
      case 'PF':
        return 'Power Forward';
        break;
      case 'C':
        return 'Center';
        break;
      default:
        break;
    }
  }

  getJerseyNumber(player: Player): string {
    if (player.jerseyNumber) {
      return `#${player.jerseyNumber}`;
    } else {
      return;
    }
  }

  handleAudio() {
    this.audio.paused ? this.audio.play() : this.audio.pause();
    this.audioIsPlaying = this.audio.paused ? false : true;
  }

  ngOnDestroy() {
    this.audio.src = '';
  }
}
