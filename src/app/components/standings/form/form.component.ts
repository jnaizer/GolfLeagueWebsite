import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { doc, setDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { DataService } from '../../../services/data.service';
import { Player, Game} from '../../../services/data.service';

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
  allGames: Game[] = [];
  holes: number[] = [9, 18];
  

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      player1: ['', Validators.required],
      player1Strokes: ['', Validators.required],
      player2: ['', Validators.required],
      player2Strokes: ['', Validators.required],
      result: ['', Validators.required],
      holes: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.setWindowResize();

    this.dataService.players.subscribe(player => {
      this.allPlayers = player
    });

    this.dataService.games.subscribe(game => {
      this.allGames = game
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

  calculateEloMult(player: string, playerRating: number, newStroke: number, result: boolean, baseEloDiff: number, holes: number) {
    let numGames = 0;
    let sumStrokes = 0;
    let avgStrokes = 0;

    for (let game of this.allGames) {
      if (player === game.player1Name) {
        numGames++;
        game.holes == 18 ? sumStrokes += game.player1Score / 2 : sumStrokes += game.player1Score;
      } else if (player === game.player2Name) {
        numGames++;
        game.holes == 18 ? sumStrokes += game.player2Score / 2 : sumStrokes += game.player2Score;
      }
    }

    numGames > 0 ? avgStrokes = sumStrokes / numGames : avgStrokes = 100000 / playerRating / 2;

    if (holes == 18) {
      avgStrokes = avgStrokes * 2;
    }

    if (result) {
      if (newStroke < avgStrokes) {
        return baseEloDiff * (1 + (0.2 * (avgStrokes - newStroke)));
      } else {
        return baseEloDiff * (1 / (1 + (0.2 * (newStroke - avgStrokes))));
      }
    }
    else {
      if (newStroke < avgStrokes) {
        return baseEloDiff * (1 / (1 + (0.2 * (avgStrokes - newStroke))));
      }
      else {
        return baseEloDiff * (1 + (0.2 * (newStroke - avgStrokes)));
      }
    }
  }

  async onSubmit() {

    // setting up variables
    const db = getFirestore();
    var EloRating = require('elo-rating');
    const player1 = this.form.value.player1;
    const player2 = this.form.value.player2;
    const result = this.form.value.result;
    const player1Strokes = this.form.value.player1Strokes;
    const player2Strokes = this.form.value.player2Strokes;
    const gameDate = this.form.value.date;
    const holes = this.form.value.holes;

    const docName = player1.name + player2.name + player1Strokes + player2Strokes + gameDate;

    // storing game in game history
    await setDoc(doc(db, "gameData", docName), {
      gameDate: gameDate,
      player1Name: player1.name,
      player1Score: player1Strokes,
      player2Name: player2.name,
      player2Score: player2Strokes,
      result: result.name,
      holes: holes
    });

    // calculating result
    var eloResult = EloRating.calculate(player1.rating, player2.rating, result.name === player1.name);

    var player1EloDiff = eloResult.playerRating - player1.rating;
    var player2EloDiff = eloResult.opponentRating - player2.rating;

    let player1Output = this.calculateEloMult(player1.name, player1.rating, player1Strokes, player1.name === result.name, player1EloDiff, holes);
    let player2Output = this.calculateEloMult(player2.name, player2.rating, player2Strokes, player2.name === result.name, player2EloDiff, holes);

    // setting new player rating
    await setDoc(doc(db, "users", player1.name), {
      name: player1.name,
      rating: player1.rating + player1Output
    });

    // setting new opponent rating
    await setDoc(doc(db, "users", player2.name), {
      name: player2.name,
      rating: player2.rating + player2Output
    });

    this.form.reset();
    while (this.playersSelected.length > 0) {
      this.playersSelected.pop();
    }
  }
}
