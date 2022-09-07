import { Component, HostListener, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-card',
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent implements OnInit {

  @Input() gameDate: string = '';
  @Input() player1Name: string = '';
  @Input() player1Score: number = 0;
  @Input() player2Name: string = '';
  @Input() player2Score: number = 0;
  @Input() result: string = '';
  cardWidth: string = '';

  constructor() { }

  ngOnInit(): void { 
    this.setWindowResize();
  }

  @HostListener('window:resize', ['$event']) setWindowResize() {
    this.cardWidth = `${window.innerWidth / 4}px`;
  }

}
