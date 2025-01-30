import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { QRCodeComponent } from 'angularx-qrcode';


@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  imports: [QRCodeComponent],
  styleUrls: ['./reservation-modal.component.css'],
})
export class ReservationModalComponent {
  constructor(
    public dialogRef: MatDialogRef<ReservationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string; qrData: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}


