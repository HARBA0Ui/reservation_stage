import { DatePipe } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-reservation-details-modal',
  templateUrl: './reservation-details-modal.component.html',
  imports: [DatePipe],
  styleUrls: ['./reservation-details-modal.component.css']
})
export class ReservationDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ReservationDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
