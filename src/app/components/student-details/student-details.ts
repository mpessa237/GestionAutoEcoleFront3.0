import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RegistrationService } from '../../services/registration-service';
import { StudentDetailsResponseDTO } from '../../models/registration.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-details',
  imports: [CommonModule],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails implements OnInit{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private regService = inject(RegistrationService);

  // Initialisé à null tant que les données ne sont pas chargées
  student: StudentDetailsResponseDTO | null = null;

  ngOnInit() {
    // Récupération du paramètre 'userId' défini dans ton fichier de routes
    const userId = Number(this.route.snapshot.paramMap.get('userId'));
    if (userId) {
      this.loadCompleteDetails(userId);
    }
  }

  loadCompleteDetails(userId: number) {
    this.regService.getStudentCompleteDetails(userId).subscribe({
      next: (data) => {
        this.student = data;
      },
      error: (err) => {
        console.error("Impossible de charger les détails de l'étudiant :", err);
      }
    });
  }

  goBack() {
    this.router.navigate(['/admin', 'all-students']);
  }

}
