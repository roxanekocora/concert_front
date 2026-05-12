import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  private authService = inject(Auth);
  private router = inject(Router);

  nom = localStorage.getItem('userNom');
  prenom = localStorage.getItem('userPrenom');

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}