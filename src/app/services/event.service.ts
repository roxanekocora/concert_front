import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class EventService {
  private http = inject(HttpClient);
   apiUrl = 'http://localhost:8080';

  // Manager - créer un event
  creerEvent(eventData: any) {
    return this.http.post(`${this.apiUrl}/event/create`, eventData);
  }

  // Manager - ses events
  getEventsByManager(managerId: number) {
    return this.http.get<any[]>(`${this.apiUrl}/event/all/${managerId}`);
  }

  // Admin - tous les events
  getEventById(eventId: number) {
    return this.http.get<any>(`${this.apiUrl}/event/${eventId}`);
  }

  // Admin - valider/refuser un event
  modifierStatut(eventId: number, adminId: number, statut: string) {
    return this.http.patch(
      `${this.apiUrl}/event/${eventId}/statut?adminId=${adminId}&statut=${statut}`,
      {}
    );
  }

 getAllEvents() {
    return this.http.get<any[]>(`${this.apiUrl}/event/all`);
    }

 validerEvent(eventId: number, adminId: number, statut: string) {
    return this.http.patch(
        `${this.apiUrl}/event/${eventId}/statut?adminId=${adminId}&statut=${statut}`,
        {}
    );
    }

  // Supprimer un event
  supprimerEvent(eventId: number, managerId: number) {
  return this.http.delete(`${this.apiUrl}/event/delete/${eventId}?managerId=${managerId}`);
}
}