import { Component, inject, OnInit, PLATFORM_ID, ChangeDetectorRef } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Auth } from '../../../services/auth';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: 'home.html',
  styleUrls: ['home.css'],
})
export class Home implements OnInit {
  private auth = inject(Auth);
  private router = inject(Router);
  private eventService = inject(EventService);
  private platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);

  isLoggedIn = false;
  userRole = '';
  concerts: any[] = [];
  isLoading = true;

  searchForm = this.fb.group({ date: [''] });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isLoggedIn = this.auth.isLoggedIn();
      this.userRole = this.auth.getUserRole() || '';
      this.chargerConcerts();
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
    this.eventService.getEventsByDate(date).subscribe({
      next: (data) => {
        this.concerts = data.filter((e) => e.statut_concert === 'VALIDE');
        this.cdr.detectChanges();
      },
    });
  }

  goToDashboard() {
    if (this.userRole === 'ADMIN') this.router.navigate(['/admin/dashboard']);
    else if (this.userRole === 'MANAGER') this.router.navigate(['/manager/dashboard']);
    else this.router.navigate(['/client/dashboard']);
  }

  logout() {
    this.auth.logout();
    this.isLoggedIn = false;
    this.userRole = '';
    this.cdr.detectChanges();
  }

  acheter(eventId: number) {
    if (this.isLoggedIn && this.userRole === 'CLIENT') {
      this.router.navigate(['/client/dashboard'], { queryParams: { eventId } });
    } else if (!this.isLoggedIn) {
      this.router.navigate(['/login'], { queryParams: { redirect: '/', eventId } });
    }
  }
}
