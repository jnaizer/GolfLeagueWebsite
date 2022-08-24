import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInDialogComponent } from '../log-in-dialog/log-in-dialog.component';
import { ToolbarService } from '../services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private dialog: MatDialog, private toolbarService: ToolbarService) { }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogInDialogComponent, {
      width: `${window.innerWidth / 4}px`,
      height: `${window.innerHeight / 4}px`,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.toolbarService.pinEntered(data && data.enteredPin == '1234');
      }
    });
  }

}
