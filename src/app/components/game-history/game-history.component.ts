import { Component, HostListener, OnInit } from '@angular/core';
import { DataService, Game } from 'src/app/services/data.service';

@Component({
  selector: 'app-game-history',
  templateUrl: './game-history.component.html',
  styleUrls: ['./game-history.component.scss']
})
export class GameHistoryComponent implements OnInit {

  games: Game[] = [];
  gamesInWeeks: Game[][] = [ [], [], [], [], [], [], [], [], [], [], [], [], [] ];
  weeks: number[] = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ];
  containerWidth: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.games.subscribe(games => { 
      this.games = games;
      this.putGamesIntoWeeks();
      this.sortGamesInWeeks();      
    });
    this.setWindowResize();
  }

  @HostListener('window:resize', ['$event']) setWindowResize() {
    this.containerWidth = `${window.innerWidth / 2}px`;
  }

  putGamesIntoWeeks() {
    for (let i = 0; i < this.games.length; i++) {
      let weekNum = this.getWeekNumber(this.games[i].gameDate);
      if (weekNum == -1) {
        window.Error('Undefined week # on ' + this.games[i] + '!');
      }
      this.gamesInWeeks[weekNum - 1].push(this.games[i]);
    }
  }

  getWeekNumber(date: string): number {
    let month: number = Number(date.substring(5, 7));
    let day: number = Number(date.substring(8, 10));
    if (month == 8 || (month == 9 && day < 6)) return 1;
    else if (month == 9 && day >= 6 && day < 12) return 2;
    else if (month == 9 && day >= 12 && day < 19) return 3;
    else if (month == 9 && day >= 19 && day < 26) return 4;
    else if (month == 9 || (month == 10 && day < 3)) return 5; 
    else if (month == 10 && day >= 3 && day < 10) return 6;
    else if (month == 10 && day >= 10 && day < 17) return 7;
    else if (month == 10 && day >= 17 && day < 24) return 8;
    else if (month == 10 && day >= 24 && day < 31) return 9;
    else if (month == 11 && day >= 31 && day < 7) return 10;
    else if (month == 11 && day >= 7 && day < 14) return 11;
    else if (month == 11 && day >= 14 && day < 21) return 12;
    else if (month == 11 && day >= 21 && day < 28) return 13;
    else return -1;
  }

  sortGamesInWeeks() {
    for (let i = 0; i < this.gamesInWeeks.length; i++) {
      this.gamesInWeeks[i].sort((g1, g2) => {
        let g1Month: number = Number(g1.gameDate.substring(5, 7));
        let g1Day: number = Number(g1.gameDate.substring(8, 10));
        let g2Month: number = Number(g2.gameDate.substring(5, 7));
        let g2Day: number = Number(g2.gameDate.substring(8, 10));
        if (g1Month == g2Month) {
          if (g1Day < g2Day) return -1;
          else if (g1Day > g2Day) return 1;
          else return 0;
        } else if (g1Month < g2Month) {
          return -1;
        } else {
          return 1;
        }
      });
    }
  }

}
