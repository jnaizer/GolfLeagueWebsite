import { Component, Input, OnInit } from '@angular/core';
import { Game } from 'src/app/services/data.service';

@Component({
  selector: 'app-match-list',
  templateUrl: './match-list.component.html',
  styleUrls: ['./match-list.component.scss']
})
export class MatchListComponent implements OnInit {

  @Input() games: Game[] = []

  constructor() { }

  ngOnInit(): void { }

}
