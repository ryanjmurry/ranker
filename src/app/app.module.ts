import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

@NgModule({
  declarations: [AppComponent, RankerComponent, ErrorComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [NbaService],
  bootstrap: [AppComponent]
})
export class AppModule {}
