import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../reservation.service';
import { DatePipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { ReservationDetailsModalComponent } from '../reservation-details-modal/reservation-details-modal.component';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; // Import AuthService

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [DatePipe, MatProgressSpinner, MatIconModule],
styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  reservations: any[] = [];
  isLoading = true; // Indicateur de chargement

  constructor(
    private reservationService: ReservationService,
    private authService: AuthService, // Inject AuthService
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations(): void {
    this.isLoading = true;
    this.reservationService.getReservations().subscribe(
      (data) => {
        this.reservations = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Erreur lors du chargement des réservations:', error);
        this.isLoading = false;
      }
    );
  }

  deleteReservation(id: number): void {
    console.log('id', id);
    if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
      this.reservationService.removeReservation(id).subscribe(() => {
        this.reservations = this.reservations.filter((r) => r.id !== id);
      });
    }
  }

  openDetails(reservation: any): void {
    this.dialog.open(ReservationDetailsModalComponent, {
      width: '500px',
      data: reservation,
    });
  }

  logout(): void {
    this.authService.logout().subscribe(
      () => {
        // Redirect or perform other actions after logout
        this.router.navigate(['/'])
        console.log('Déconnexion réussie');
      },
      (error) => {
        console.error('Erreur lors de la déconnexion:', error);
      }
    );
  }
}
