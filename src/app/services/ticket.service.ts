import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TicketService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  acheterTicket(clientId: number, eventId: number) {
    const today = new Date().toISOString().split('T')[0];
    return this.http.post(`${this.apiUrl}/ticket/acheter`, {
      clientId,
      eventId,
      dateAchat: today
    });
  }

  getTicketsClient(clientId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/ticket/all/client/${clientId}`);
  }
}
