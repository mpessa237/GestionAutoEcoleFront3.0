import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegistrationService } from '../../services/registration-service';

@Component({
  selector: 'app-home-component',
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit{
activeCandidatesCount: number = 0;
  activeMonitorsCount: number = 8; // Reste statique pour l'instant

  constructor(
    private router: Router,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.loadRealCandidatesCount();
  }

  loadRealCandidatesCount(): void {
    this.registrationService.getAllActiveStudents().subscribe({
      next: (activeStudents) => {
        // La taille du tableau donne directement le nombre réel d'élèves actifs en BD
        this.activeCandidatesCount = activeStudents.length;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des étudiants actifs", err);
        this.activeCandidatesCount = 0; // Valeur de repli en cas d'erreur
      }
    });
  }

  navigateTo(commands: any[]): void {
    this.router.navigate(commands);
  }
}
