import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

export interface Player { name: string, rating: number };


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>;

  constructor(private firestore: AngularFirestore) { 
    this.playersCollection = this.firestore.collection<Player>('users');
    this.players = this.playersCollection.valueChanges();
  }

}
