import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Player } from '../player.model';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NbaService {
  constructor(private afs: AngularFirestore) {}

  getAllPlayers() {
    return this.afs.collection<Player>('players').snapshotChanges();
  }

  getPlayer(id: string) {
    return this.afs
      .doc<Player>(`players/${id}`)
      .valueChanges()
      .pipe(take(1));
  }
}
