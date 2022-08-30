import { AfterContentInit, Component, EnvironmentInjector, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { doc, setDoc, getDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { DataService } from '../../../services/data.service';
import { Player } from '../../../services/data.service';
declare var require: any;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  cardWidth: string = '';
  allPlayers: Player[] = [];
  playersSelected: Player[] = [];

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      player1: ['', Validators.required],
      player1Strokes: ['', Validators.required],
      player2: ['', Validators.required],
      player2Strokes: ['', Validators.required],
      result: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.setWindowResize();

    this.dataService.players.subscribe(player => {
      this.allPlayers = player
    });

  }

  @HostListener('window:resize', ['$event']) setWindowResize() {
    this.cardWidth = `${window.innerWidth / 2}px`;
  }

  updatePlayer1() {
    this.playersSelected[0] = this.form.value.player1;
  }

  updatePlayer2() {
    this.playersSelected[1] = this.form.value.player2;
  }

  async onSubmit() {

    if(this.form.invalid) {
      this.form.setErrors({ ...this.form.errors, 'yourErrorName': true });
      console.log("invalid");
      return;
    }

    // setting up variables
    const db = getFirestore();
    var EloRating = require('elo-rating');
    const player1 = this.form.value.player1;
    const player2 = this.form.value.player2;
    const result = this.form.value.result;
    const player1Strokes = this.form.value.player1Strokes;
    const player2Strokes = this.form.value.player2Strokes;
    const date = this.form.value.date;

    // calculating result
    var eloResult = EloRating.calculate(player1.rating, player2.rating, result.name === player1.name);

    // setting new player rating
    await setDoc(doc(db, "users", player1.name), {
      name: player1.name,
      rating: eloResult.playerRating
    });

    // setting new opponent rating
    await setDoc(doc(db, "users", player2.name), {
      name: player2.name,
      rating: eloResult.opponentRating
    });

    this.form.reset();
    while (this.playersSelected.length > 0) {
      this.playersSelected.pop();
    }
  }
}
