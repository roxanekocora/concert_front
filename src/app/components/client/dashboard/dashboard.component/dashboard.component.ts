import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { Auth } from '../../../../services/auth';
import { EventService } from '../../../../services/event.service';
import { TicketService } from '../../../../services/ticket.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  private authService = inject(Auth);
  private eventService = inject(EventService);
  private ticketService = inject(TicketService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  nom = '';
  prenom = '';
  clientId!: number;
  concerts: any[] = [];
  isLoading = true;
  successMessage = '';
  errorMessage = '';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.nom = localStorage.getItem('userNom') || '';
      this.prenom = localStorage.getItem('userPrenom') || '';
      this.clientId = Number(localStorage.getItem('userId'));
      this.chargerConcerts();

      // Si redirection depuis la page publique avec un eventId
      this.route.queryParams.subscribe((params) => {
        if (params['eventId']) {
          this.acheterTicket(Number(params['eventId']));
        }
      });
    }
  }

  chargerConcerts() {
    this.eventService.getEventsValides().subscribe({
      next: (data) => {
        this.concerts = data.filter((e) => e.statut_concert === 'VALIDE');
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  acheterTicket(eventId: number) {
    this.ticketService.acheterTicket(this.clientId, eventId).subscribe({
      next: () => {
        this.successMessage = 'Billet acheté avec succès ! 🎉';
        this.chargerConcerts();
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.errorMessage = "Erreur lors de l'achat.";
        this.cdr.detectChanges();
      },
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
