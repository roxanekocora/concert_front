import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class Auth {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080';

  login(credentials: { email: string, mdp: string }) {
    return this.http.post<any>(`${this.apiUrl}/user/connexion`, credentials).pipe(
      tap(response => {
        // Pas de token JWT, on sauvegarde l'utilisateur complet
        localStorage.setItem('userRole', response.role);
        localStorage.setItem('userId', response.id);
        localStorage.setItem('userNom', response.nom);
        localStorage.setItem('userPrenom', response.prenom);
      })
    );
  }

  getUserRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  getUserId(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userId');
    }
    return null;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('userRole');
  }

  logout() {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userId');
    localStorage.removeItem('userNom');
    localStorage.removeItem('userPrenom');
  }

  registerClient(clientData: any) {
    return this.http.post(`${this.apiUrl}/client/inscription`, clientData);
  }
  
  registerManager(managerData: any) {
  return this.http.post(`${this.apiUrl}/manager/ajouter`, managerData);
}
}