import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { EventService } from '../../../services/event.service';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-concert-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: 'concert-list.html',
  styleUrls: ['concert-list.css'],
})
export class ConcertList implements OnInit {
  private eventService = inject(EventService);
  private authService = inject(Auth);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  concerts: any[] = [];
  isLoading = true;
  errorMessage = '';
  isLoggedIn = false;

  searchForm = this.fb.group({
    date: [''],
  });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.chargerConcerts();
    }
  }

  chargerConcerts() {
    this.isLoading = true;
    this.eventService.getEventsValides().subscribe({
      next: (data) => {
        // Filtre uniquement les concerts validés
        this.concerts = data.filter((e) => e.statut_concert === 'VALIDE');
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des concerts.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  rechercherParDate() {
    const date = this.searchForm.value.date;
    if (!date) {
      this.chargerConcerts();
      return;
    }
    this.isLoading = true;
    this.eventService.getEventsByDate(date).subscribe({
      next: (data) => {
        this.concerts = data.filter((e) => e.statut_concert === 'VALIDE');
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Aucun concert trouvé pour cette date.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  acheter(eventId: number) {
    if (this.isLoggedIn) {
      this.router.navigate(['/client/dashboard'], {
        queryParams: { eventId },
      });
    } else {
      this.router.navigate(['/login'], {
        queryParams: { redirect: '/concerts', eventId },
      });
    }
  }
  reset() {
    this.searchForm.reset();
    this.chargerConcerts();
  }
}
