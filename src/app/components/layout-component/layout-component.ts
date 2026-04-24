import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout-component',
  imports: [CommonModule,RouterModule],
  templateUrl: './layout-component.html',
  styleUrl: './layout-component.css',
})
export class LayoutComponent {
  public authService = inject(AuthService);

  isInscriptionOpen = false;

  toggleInscription() {
    this.isInscriptionOpen = !this.isInscriptionOpen;
  }

  constructor() {
    console.log("Rôle actuel détecté :", this.authService.userRole());
  }

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }

}
