import { Component, EnvironmentInjector, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { DataService } from '../services/data.service';
import { Player } from '../services/data.service';
declare var require: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  cardWidth: string = '';
  dataSource: Player[] = [];
  playerNames: string[] = [];
  playerSelected : string = '';
  opponentSelected: string = '';

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      player1: [''],
      player1Score: [''],
      player2: [''],
      player2Score: [''],
      result: [''],
    });
    this.setWindowResize();

    this.dataService.players.subscribe(player => {
      this.dataSource = player
    });
  }

  @HostListener('window:resize', ['$event']) setWindowResize() {
    this.cardWidth = `${window.innerWidth / 2}px`;
  }

  updatePlayers() {
    this.playerNames = [];
    for (let i = 0; i < this.dataSource.length; i++) {
      this.playerNames.push(this.dataSource[i].name)
    }
  }

  async onSubmit() {
    // setting up variables
    const db = getFirestore();
    var EloRating = require('elo-rating');
    const player1 = this.form.value.player1;
    const player2 = this.form.value.player2;
    const result = this.form.value.result;
    let player1Rating = null;
    let player2Rating = null;

    // getting player rating
    const player1Doc = doc(db, "users", player1);
    const player1DocSnap = await getDoc(player1Doc);
    if (player1DocSnap.exists()) {
      player1Rating = player1DocSnap.data()['rating'];
    } else {
      console.log("No such document!");
    }

    // getting opponent rating
    const player2Doc = doc(db, "users", player2);
    const player2DocSnap = await getDoc(player2Doc);
    if (player2DocSnap.exists()) {
      player2Rating = player2DocSnap.data()['rating'];
    } else {
      console.log("No such document!");
    }

    // calculating result
    var eloResult = EloRating.calculate(player1Rating, player2Rating, result === player1);

    // setting new player rating
    await setDoc(doc(db, "users", player1), {
      name: player1,
      rating: eloResult.playerRating
    });

    // setting new opponent rating
    await setDoc(doc(db, "users", player2), {
      name: player2,
      rating: eloResult.opponentRating
    });
  }
}
