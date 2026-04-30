import { signal } from '@angular/core';
import { Component, inject } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { Auth} from './services/auth';
import { routes } from './app.routes';

@Component({
  selector: 'app-root',
  standalone: true,
  // Ajout de RouterLink (pour les liens) et RouterLinkActive (pour styliser le lien de la page actuelle)
  imports: [RouterOutlet, RouterLink, RouterLinkActive], 
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class App {
  protected readonly title = signal('concert_front');

  authService = inject(Auth);
  private router = inject(Router);

  // Méthode appelée quand on clique sur le bouton de déconnexion
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}