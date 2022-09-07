import { Component, HostListener, OnInit } from '@angular/core';
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

  divWidth: string = '';
  divMargin: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.players.subscribe(players => this.players = players);
    this.dataService.games.subscribe(games => this.games = games);
    this.onWindowResize();
  }
  
  @HostListener('window:resize', ['$event']) onWindowResize() {
    if (window.innerWidth <= 1000) {
      this.divWidth = '50%';
      this.divMargin = '32px';
    } else {
      this.divWidth = '20%';
      this.divMargin = '0px';
    }
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
    this.sortGames();
  }

  sortGames() {
    for (let i = 0; i < this.gamesInvolvingSelectedPlayer.length; i++) {
      this.gamesInvolvingSelectedPlayer.sort((g1, g2) => {
        let g1Month: number = Number(g1.gameDate.substring(5, 7));
        let g1Day: number = Number(g1.gameDate.substring(8, 10));
        let g2Month: number = Number(g2.gameDate.substring(5, 7));
        let g2Day: number = Number(g2.gameDate.substring(8, 10));
        if (g1Month == g2Month) {
          if (g1Day < g2Day) return 1;
          else if (g1Day > g2Day) return -1;
          else return 0;
        } else if (g1Month < g2Month) {
          return 1;
        } else {
          return -1;
        }
      });
    }
  }

}
