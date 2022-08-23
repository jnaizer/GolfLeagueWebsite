import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  displayedColumns = ['name', 'rating'];
  dataSource: { name: string, rating: number }[] = [];

  constructor() { }

  ngOnInit(): void {
    // read json file
    this.dataSource.push({ name: 'Sean', rating: 101 });
    this.dataSource.push({ name: 'John', rating: 94 });
    this.dataSource.push({ name: 'Max', rating: 92 });
    this.dataSource.push({ name: 'Ethan', rating: 90 });
    this.dataSource.push({ name: 'Grant', rating: 86 });
  }

}
