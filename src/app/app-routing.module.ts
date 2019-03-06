import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankerComponent } from './ranker/ranker.component';
import { ErrorComponent } from './shared/components/error/error.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'nba', component: RankerComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
