import { Component, OnInit } from '@angular/core';
import { DataService, Game } from 'src/app/services/data.service';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

  //games: { player1Name: string, player1Score: number, player2Name: string, player2Score: number, gameDate: string }[] = [
  //  { player1Name: 'Sean', player1Score: 100, player2Name: 'John', player2Score: 106, gameDate: '8/29/2022' },
  //  { player1Name: 'Max', player1Score: 85, player2Name: 'Ethan', player2Score: 90, gameDate: '8/29/2022' },
  //  { player1Name: 'Grant', player1Score: 90, player2Name: 'Scot', player2Score: 110, gameDate: '8/29/2022' },
  //  { player1Name: 'Bennett', player1Score: 108, player2Name: 'Chapman', player2Score: 106, gameDate: '8/29/2022' },
  //];

  games: Game[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.games.subscribe(games => { this.games = games })
    
  }

}
