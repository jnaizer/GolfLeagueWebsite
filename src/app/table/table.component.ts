import { Component, OnInit } from '@angular/core';
import ratings from './ratings.json';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns = ['name', 'rating'];
  dataSource: { name: string, rating: number }[] = [];
  cardWidth: string = '';

  constructor() { }

  ngOnInit(): void {
    for (let key in ratings) {
      let value = ratings[key as keyof typeof ratings]
      this.dataSource.push({ name: key, rating: parseInt(value) });
    }
    this.cardWidth = `${window.innerWidth / 2}px`;
  }

}
