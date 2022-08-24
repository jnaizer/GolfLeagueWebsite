import { Component, OnInit } from '@angular/core';
import { ToolbarService } from './services/toolbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  authorizedUser: boolean = false;

  constructor(private toolbarService: ToolbarService) { }

  ngOnInit(): void {
    this.toolbarService.onPinEntered.subscribe(bool => { this.authorizedUser = bool })
  }

}
