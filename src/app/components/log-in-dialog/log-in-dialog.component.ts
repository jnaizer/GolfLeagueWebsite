import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-in-dialog',
  templateUrl: './log-in-dialog.component.html',
  styleUrls: ['./log-in-dialog.component.scss']
})
export class LogInDialogComponent implements OnInit {

  enteredPin: string = '';
  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<LogInDialogComponent>) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      enteredPin: [''],
    });
  }

  onSubmit() {
    this.dialogRef.close(this.form.value);
  }

  onClose() {
    this.dialogRef.close();
  }

}
