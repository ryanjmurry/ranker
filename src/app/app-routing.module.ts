import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RankerComponent } from './ranker/ranker.component';
import { ErrorComponent } from './shared/components/error/error.component';

const routes: Routes = [
  { path: '', redirectTo: '/nba', pathMatch: 'full' },
  { path: 'nba', component: RankerComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
