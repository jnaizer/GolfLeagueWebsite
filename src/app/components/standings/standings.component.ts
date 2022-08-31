import { Component, OnInit } from '@angular/core';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.scss']
})
export class StandingsComponent implements OnInit {

  authorizedUser: boolean = false;

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit(): void { 
    this.toolbarService.authorizedUser.subscribe(bool => { this.authorizedUser = bool });
  }

}
