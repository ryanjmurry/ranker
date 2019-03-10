import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Player } from '../player.model';
import { NbaService } from '../services/nba.service';
import { forkJoin } from 'rxjs';
import { IDLIST } from './id-list';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { InstructionsDialogComponent } from '../shared/dialogs/instructions-dialog/instructions-dialog.component';
import { KEY_CODE } from './key-code.enum';

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
  windowSize: number;
  winnerStays: boolean = false;
  useArrows: boolean = false;

  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.keyCode === KEY_CODE.LEFT_ARROW && this.windowSize >= 760 && this.useArrows) {
      this.submitRanking(this.playerList[0].mfsId);
    }

    if (event.keyCode === KEY_CODE.RIGHT_ARROW && this.windowSize >= 760 && this.useArrows) {
      this.submitRanking(this.playerList[1].mfsId);
    }

    if (event.keyCode === KEY_CODE.UP_ARROW && this.windowSize < 760 && this.useArrows) {
      this.submitRanking(this.playerList[0].mfsId);
    }

    if (event.keyCode === KEY_CODE.DOWN_ARROW && this.windowSize < 760 && this.useArrows) {
      this.submitRanking(this.playerList[1].mfsId);
    }
  }

  constructor(private nbaService: NbaService, private dialog: MatDialog) {}

  ngOnInit() {
    if (!localStorage.getItem('instructed')) {
      setTimeout(() => {
        this.openDialog();
      });
    }
    // this.openDialog();
    this.windowSize = window.innerWidth;
    this.audio.loop = true;
    this.audio.currentTime = 8;
    this.handleAudio();
    this.beginRanking();
  }

  openDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;
    const dialogRef: MatDialogRef<InstructionsDialogComponent> = this.dialog.open(
      InstructionsDialogComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(() => {
      localStorage.setItem('instructed', 'true');
    });
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

  getNewPlayer(winnerIndex: number, loserIndex: number): void {
    let id1: string = this.playerList[winnerIndex].mfsId;
    let id2: string;
    do {
      id2 = this.randomPlayerId();
    } while (id1 === id2);
    this.fetchNewPlayer(id2, loserIndex);
  }

  fetchNewPlayer(id2: string, newPlayerIndex: number): void {
    this.nbaService.getPlayer(id2).subscribe(player => {
      this.playerList[newPlayerIndex] = player;
      this.loading = false;
    });
  }

  fetchNewPlayers(id1: string, id2: string): void {
    forkJoin(this.nbaService.getPlayer(id1), this.nbaService.getPlayer(id2)).subscribe(
      ([p1, p2]) => {
        this.playerList[0] = p1;
        this.playerList[1] = p2;
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
      if (this.winnerStays) {
        this.getNewPlayer(this.playerList.indexOf(winner), this.playerList.indexOf(loser));
      } else {
        this.getNewPlayers();
      }
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

  onResize(event) {
    this.windowSize = event.target.innerWidth;
  }

  ngOnDestroy() {
    this.audio.src = '';
  }
}
