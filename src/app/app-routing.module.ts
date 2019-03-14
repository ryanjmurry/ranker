import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankerComponent } from './ranker/ranker.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'nba', component: RankerComponent },
  { path: 'leaderboard', component: LeaderboardComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
