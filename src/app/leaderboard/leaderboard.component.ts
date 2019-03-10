import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { NbaService } from '../services/nba.service';
import { Player } from '../player.model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.scss']
})
export class LeaderboardComponent implements AfterViewInit {
  loading: boolean = true;
  dataSource: MatTableDataSource<Player>;
  displayedColumns: string[] = [
    'teamAbbreviation',
    'firstName',
    'lastName',
    'winPercentage',
    'wins',
    'losses'
  ];
  leader: Player;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private nbaService: NbaService) {}

  ngAfterViewInit() {
    this.loading = true;
    this.nbaService.getPlayerData().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.leader = this.dataSource.filteredData[0];
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
}
