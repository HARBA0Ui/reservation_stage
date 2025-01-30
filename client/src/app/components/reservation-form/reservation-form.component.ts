import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReservationModalComponent } from '../reservation-modal/reservation-modal.component';
import { ReservationService } from '../../reservation.service';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  imports: [ReactiveFormsModule],
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent {
  reservationForm: FormGroup;
  qrData: string = '';

  typeAccesOptions = ['FORMATION', 'CONFERENCE'];
  dispositionOptions = ['EN_REUNION', 'STYLE_CINEMA'];
  directionOptions = ['DNS', 'TPR']; // Ajout des options pour le select

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private reservationService: ReservationService
  ) {
    this.reservationForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      tel: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      direction: ['', Validators.required],
      dates: this.fb.group({
        datedeb: ['', Validators.required],
        datefin: ['', Validators.required],
      }),
      typeAcces: ['', Validators.required],
      materiel: this.fb.group({
        videoProjecteur: [false],
        television: [false],
        tableauInteractif: [false],
      }),
      disposition: ['', Validators.required],
      participants: ['', [Validators.required, Validators.min(1)]],
      raison: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.reservationForm.valid) {
      const formData = this.formatFormData(this.reservationForm.value);

      this.reservationService.createReservation(formData).subscribe(
        (response) => {
          console.log('Réservation créée:', response);
          this.qrData = JSON.stringify(response);

          this.openDialog();
          this.reservationForm.reset();
        },
        (error) => {
          console.error('Erreur lors de la réservation:', error);
        }
      );
    } else {
      console.error('Formulaire invalide.');
    }
  }
  formatFormData(data: any): any {
    return {
      ...data,
      datedeb: new Date(data.dates.datedeb).toISOString(),
      datefin: new Date(data.dates.datefin).toISOString(),
      materiels: Object.entries(data.materiel)
        .filter(([key, value]) => value)
        .map(([key]) => key.toUpperCase()),  // Ensure values are uppercase and match enum
    };
}
  openDialog(): void {
    if (!this.qrData) {
      console.error('QR Data is missing');
      return;
    }

    this.dialog.open(ReservationModalComponent, {
      data: {
        message: 'Votre demande de réservation a été créée. Nous vous contacterons pour plus d\'informations!',
        qrData: this.qrData,
      },
    });
  }
}
