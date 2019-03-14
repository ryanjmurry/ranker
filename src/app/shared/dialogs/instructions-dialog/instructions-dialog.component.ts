import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-instructions-dialog',
  templateUrl: './instructions-dialog.component.html',
  styleUrls: ['./instructions-dialog.component.scss']
})
export class InstructionsDialogComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<InstructionsDialogComponent>) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }
}
