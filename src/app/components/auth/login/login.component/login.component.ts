import { Component, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router'; // RouterLink permet de faire un lien vers l'inscription
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], // Tu peux réutiliser le CSS du Register ici !
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);
  private platformId = inject (PLATFORM_ID)

  errorMessage = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Si déjà connecté, redirige vers le bon dashboard
      if (this.authService.isLoggedIn()) {
        const role = this.authService.getUserRole();
        if (role === 'ADMIN') this.router.navigate(['/admin/dashboard']);
        else if (role === 'MANAGER') this.router.navigate(['/manager/dashboard']);
        else this.router.navigate(['/client/dashboard']);
      }
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as any).subscribe({
        next: () => {
          // Si la connexion réussit, on récupère le rôle
          const role = this.authService.getUserRole();

          // Et on redirige vers le bon tableau de bord
          if (role === 'MANAGER') {
            this.router.navigate(['/manager/dashboard']);
          } else if (role === 'ADMIN') {
            this.router.navigate(['/admin/dashboard']);
          } else {
            this.router.navigate(['/client/dashboard']);
          }
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Email ou mot de passe incorrect.';
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
