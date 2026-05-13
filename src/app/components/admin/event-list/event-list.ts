import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'event-list.html',
  styleUrls: ['event-list.css']
})
export class EventList implements OnInit {
  private eventService = inject(EventService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  events: any[] = [];
  isLoading = true;
  adminId!: number;
  errorMessage = '';
  successMessage = '';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.adminId = Number(localStorage.getItem('userId'));
      this.chargerEvents();
    }
  }

  chargerEvents() {
    this.eventService.getAllEvents().subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement.';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  valider(eventId: number) {
    this.eventService.validerEvent(eventId, this.adminId, 'VALIDE').subscribe({
      next: () => {
        this.successMessage = 'Événement validé !';
        this.chargerEvents();
      },
      error: () => this.errorMessage = 'Erreur lors de la validation.'
    });
  }

  refuser(eventId: number) {
    this.eventService.validerEvent(eventId, this.adminId, 'ANNULE').subscribe({
      next: () => {
        this.successMessage = 'Événement refusé.';
        this.chargerEvents();
      },
      error: () => this.errorMessage = 'Erreur lors du refus.'
    });
  }

  getStatutClass(statut: string): string {
    switch (statut) {
      case 'VALIDE': return 'statut-valide';
      case 'ANNULE': return 'statut-refuse';
      default: return 'statut-attente';
    }
  }
}
