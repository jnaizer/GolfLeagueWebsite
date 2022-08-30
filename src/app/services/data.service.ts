import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Player { name: string, rating: number };
export interface Game { gameDate: string, player1Name: string, player1Score: number, player2Name: string, player2Score: number, result: string }


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private playersCollection: AngularFirestoreCollection<Player>;
  players: Observable<Player[]>;
  private gamesCollection: AngularFirestoreCollection<Game>;
  games: Observable<Game[]>;

  constructor(private firestore: AngularFirestore) { 
    this.playersCollection = this.firestore.collection<Player>('users');
    this.players = this.playersCollection.valueChanges();
    this.gamesCollection = this.firestore.collection<Game>('gameData');
    this.games = this.gamesCollection.valueChanges();
  }

}
