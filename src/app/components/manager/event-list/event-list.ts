import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: 'event-list.html',
  styleUrls: ['event-list.css']
})
export class EventListComponent implements OnInit {
  private eventService = inject(EventService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef); // ← ajoute ça

  events: any[] = [];
  isLoading = true; // ← ajoute ça
  managerId!: number;
  errorMessage = '';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.managerId = Number(localStorage.getItem('userId'));
      this.chargerEvents();
    }
  }

  chargerEvents() {
    this.eventService.getEventsByManager(this.managerId).subscribe({
      next: (data) => {
        this.events = data;
        this.isLoading = false;
        this.cdr.detectChanges(); // ← force le re-rendu
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du chargement des événements.';
        this.cdr.detectChanges();
      }
    });
  }

  supprimerEvent(eventId: number) {
  if (confirm('Supprimer cet événement ?')) {
    this.eventService.supprimerEvent(eventId, this.managerId).subscribe({
      next: () => {
        this.chargerEvents();
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de la suppression.';
        this.cdr.detectChanges();
      }
    });
  }
}

getStatutClass(statut: string): string {
  switch (statut) {
    case 'VALIDE': return 'statut-valide';
    case 'REFUSE': return 'statut-refuse';
    default: return 'statut-attente';
  }
}
  // ... reste du code inchangé
}
