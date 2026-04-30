import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Auth } from '../../../../services/auth';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(Auth);
  private router = inject(Router);

  errorMessage = '';

  // Formulaire calqué sur User + Client (stratégie JOINED)
  registerForm = this.fb.group({
  nom: ['', Validators.required],
  prenom: ['', Validators.required],
  email: ['', [Validators.required, Validators.email]],
  telephone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],  // ← tel → telephone
  date_naissance: ['', Validators.required],                                // ← date_naiss → date_naissance
  password: ['', [Validators.required, Validators.minLength(6)]],          // ← mdp → password
  client_newsletter: [false]                                                // ← statut_client → client_newsletter
});

  onSubmit() {
    if (this.registerForm.valid) {
      // On envoie l'objet complet au service
      this.authService.registerClient(this.registerForm.value).subscribe({
        next: () => {
          // Succès : on redirige vers le login pour que le client se connecte
          alert('Compte créé avec succès ! Veuillez vous connecter.');
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = "Une erreur est survenue lors de l'inscription. L'email est peut-être déjà utilisé.";
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }
}