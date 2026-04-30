import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  private authService = inject(Auth);
  private router = inject(Router);

  nom = localStorage.getItem('userNom');
  prenom = localStorage.getItem('userPrenom');

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}