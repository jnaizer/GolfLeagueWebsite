import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-about-dialogue',
  templateUrl: './about-dialogue.component.html',
  styleUrls: ['./about-dialogue.component.scss']
})
export class AboutDialogueComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private dialogRef: MatDialogRef<AboutDialogueComponent>) { }

  ngOnInit(): void {
  }

  onClose() {
    this.dialogRef.close();
  }
}
