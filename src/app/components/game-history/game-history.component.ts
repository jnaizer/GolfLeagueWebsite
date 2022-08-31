import { Component, OnInit } from '@angular/core';
import { DataService, Game } from 'src/app/services/data.service';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

  games: Game[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.games.subscribe(games => { this.games = games });
  }

}
