import { Component, EnvironmentInjector, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
declare var require: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  cardWidth: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      player1: [''],
      player2: [''],
      result: [''],
    });
    this.setWindowResize();
  }

  @HostListener('window:resize', ['$event']) setWindowResize() {
    this.cardWidth = `${window.innerWidth / 2}px`;
  }

  async onSubmit() {
    // setting up variables
    const db = getFirestore();
    var EloRating = require('elo-rating');
    const player = this.form.value.player1;
    const opponent = this.form.value.player2;
    let winner = this.form.value.winner;
    let playerRating = null;
    let opponentRating = null;

    // getting player rating
    const playerDoc = doc(db, "users", player);
    const playerDocSnap = await getDoc(playerDoc);
    if (playerDocSnap.exists()) {
      playerRating = playerDocSnap.data()['rating'];
    } else {
      console.log("No such document!");
    }

    // getting opponent rating
    const opponentDoc = doc(db, "users", opponent);
    const opponentDocSnap = await getDoc(opponentDoc);
    if (opponentDocSnap.exists()) {
      opponentRating = opponentDocSnap.data()['rating'];
    } else {
      console.log("No such document!");
    }

    // calculating result
    var result = EloRating.calculate(playerRating, opponentRating, winner === player);

    // setting new player rating
    await setDoc(doc(db, "users", player), {
      name: player,
      rating: result.playerRating
    });

    // setting new opponent rating
    await setDoc(doc(db, "users", opponent), {
      name: opponent,
      rating: result.opponentRating
    });
  }
}
