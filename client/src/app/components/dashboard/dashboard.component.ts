import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../../reservation.service';
import { DatePipe } from '@angular/common';
import {MatProgressSpinner} from "@angular/material/progress-spinner"
import {MatIconModule} from '@angular/material/icon'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [DatePipe, MatProgressSpinner, MatIconModule],
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reservations: any[] = [];
  isLoading = true; // Indicateur de chargement

  constructor(private reservationService: ReservationService) {}

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
    if (confirm('Voulez-vous vraiment supprimer cette réservation ?')) {
      this.reservationService.removeReservation(id).subscribe(() => {
        this.reservations = this.reservations.filter(r => r.id !== id);
      });
    }
  }
}