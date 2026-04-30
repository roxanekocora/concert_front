import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-manager-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './manager-form.html',
  styleUrls: ['./manager-form.css']
})
export class ManagerForm {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  errorMessage = '';
  successMessage = '';

  managerForm = this.fb.group({
    nom: ['', Validators.required],
    prenom: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
    manager_agence: ['', Validators.required],
    date_naissance: ['', Validators.required]
  });

  onSubmit() {
    if (this.managerForm.valid) {
      this.authService.registerManager(this.managerForm.value).subscribe({
        next: () => {
          this.successMessage = 'Manager créé avec succès !';
          this.managerForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erreur lors de la création du manager.';
        }
      });
    } else {
      this.managerForm.markAllAsTouched();
    }
  }
}