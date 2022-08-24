import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

    this.cardWidth = `${window.innerWidth / 2}px`;
  }

  onSubmit(): void {
    // TODO hook the ELO Rating package up to this method
    var EloRating = require('elo-rating');
    var result = EloRating.calculate(1750, 1535, true);
    console.log(result)
    console.log("submitted");
  }
}
