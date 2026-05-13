import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TicketService } from '../../../services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: 'ticket-list.html',
  styleUrls: ['ticket-list.css'],
})
export class TicketList implements OnInit {
  private ticketService = inject(TicketService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);

  tickets: any[] = [];
  isLoading = true;
  clientId!: number;
  errorMessage = '';

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.clientId = Number(localStorage.getItem('userId'));
      this.chargerTickets();
    }
  }

  chargerTickets() {
    this.ticketService.getTicketsClient(this.clientId).subscribe({
      next: (data) => {
        this.tickets = data;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.errorMessage = 'Erreur lors du chargement des billets.';
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }
}
