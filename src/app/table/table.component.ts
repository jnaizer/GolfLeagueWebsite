import { Component, HostListener, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Player } from '../services/data.service';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns = ['#', 'name', 'rating'];
  dataSource: Player[] = [];
  cardWidth: string = '';

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.dataService.players.subscribe(players => {
      this.dataSource = players.sort((player1, player2) => {
        if (player1.rating < player2.rating) {
          return 1;
        } else if (player1.rating > player2.rating) {
          return -1;
        }
        return 0;
      });
    })
    this.setWindowResize();
  }

  @HostListener('window:resize', ['$event']) setWindowResize() {
    this.cardWidth = `${window.innerWidth / 2}px`;
  }

}
