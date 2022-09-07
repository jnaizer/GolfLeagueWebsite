import { Component, OnInit } from '@angular/core';
import { DataService, Game, Player } from 'src/app/services/data.service';

@Component({
  selector: 'app-player-records',
  templateUrl: './player-records.component.html',
  styleUrls: ['./player-records.component.scss']
})
export class PlayerRecordsComponent implements OnInit {

  players: Player[] = [];
  games: Game[] = [];

  selectedPlayerName: string = '';
  selectedPlayer: Player = { name: '', rating: 0 };
  gamesInvolvingSelectedPlayer: Game[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.players.subscribe(players => this.players = players);
    this.dataService.games.subscribe(games => this.games = games);
    
  }

  onChange(event: Event) {
    console.log(event);
  }

}
