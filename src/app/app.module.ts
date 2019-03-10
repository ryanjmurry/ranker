import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RankerComponent } from './ranker/ranker.component';
import { environment } from '../environments/environment';
import { NbaService } from './services/nba.service';
import { ErrorComponent } from './shared/components/error/error.component';
import { HomeComponent } from './home/home.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { InstructionsDialogComponent } from './shared/dialogs/instructions-dialog/instructions-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    RankerComponent,
    ErrorComponent,
    HomeComponent,
    LeaderboardComponent,
    InstructionsDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [NbaService],
  entryComponents: [InstructionsDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
