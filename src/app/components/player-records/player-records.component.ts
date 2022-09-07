import { Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
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
  selectedPlayerAverageScore: number = 0;
  selectedPlayerRecord: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.players.subscribe(players => this.players = players);
    this.dataService.games.subscribe(games => this.games = games);
  }

  onSelectionChange(event: MatSelectChange): void {
    let cummScore: number = 0;
    let numOfRounds: number = 0;
    let totalMatches: number = 0;
    let wins: number = 0;
    this.selectedPlayer = this.players.find((player) => player.name == event.value) as Player;
    this.gamesInvolvingSelectedPlayer = this.games.filter((game) => {
      let bool: boolean = game.player1Name == this.selectedPlayerName || game.player2Name == this.selectedPlayerName;
      if (bool) {
        if (game.player1Name == this.selectedPlayerName) {
          cummScore += game.player1Score;
        } else {
          cummScore += game.player2Score;
        }
        if (game.holes == 9) {
          numOfRounds += 1;
        }
        else {
          numOfRounds += 2;
        }
        if (game.result == this.selectedPlayerName) {
          wins++;
        }
        totalMatches++;
      }
      return bool;
    });
    this.selectedPlayerAverageScore = cummScore / (numOfRounds / 2);
    this.selectedPlayerRecord = `${wins}-${totalMatches - wins}`;
  }

}
