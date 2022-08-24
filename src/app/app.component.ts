import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './form/form.component';
import { LogInDialogComponent } from './log-in-dialog/log-in-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  authorizedUser: boolean = false;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void { }

  openDialog() {
    const dialogRef = this.dialog.open(LogInDialogComponent, {
      width: `${window.innerWidth / 4}px`,
      height: `${window.innerHeight / 4}px`,
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.authorizedUser = data && data.enteredPin == '1234'; 
      }
    });
  }

}
