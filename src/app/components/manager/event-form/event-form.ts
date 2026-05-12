import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../../../services/event.service';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: 'event-form.html',
  styleUrls: ['event-form.css']
})
export class EventFormComponent implements OnInit {
  
  private fb = inject(FormBuilder);
  private eventService = inject(EventService);
  private router = inject(Router);

  errorMessage = '';
  successMessage = '';
  managerId!: number;

  eventForm = this.fb.group({
    nom: ['', Validators.required],
    description: ['', Validators.required],
    artiste: ['', Validators.required],
    lieu: ['', Validators.required],
    dateConcert: ['', Validators.required],
    genreMusical: ['', Validators.required],
    nbPlaceDispo: [null, [Validators.required, Validators.min(1)]],
    dureeConcert: [null, [Validators.required, Validators.min(1)]],
    prix_ticket: [null, [Validators.required, Validators.min(0)]]
  });

  ngOnInit() {
    this.managerId = Number(localStorage.getItem('userId'));
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const eventData = {
        ...this.eventForm.value,
        managerId: this.managerId
      };

      this.eventService.creerEvent(eventData).subscribe({
        next: () => {
          this.successMessage = 'Événement créé avec succès !';
          this.eventForm.reset();
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Erreur lors de la création de l\'événement.';
        }
      });
    } else {
      this.eventForm.markAllAsTouched();
    }
  }
}