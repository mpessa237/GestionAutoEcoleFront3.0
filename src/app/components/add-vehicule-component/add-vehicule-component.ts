import { Component, inject } from '@angular/core';
import { VehiculeService } from '../../services/vehicule-service';
import { Router } from '@angular/router';
import { VehicleRequestDTO } from '../../models/registration.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-vehicule-component',
  imports: [CommonModule,FormsModule],
  templateUrl: './add-vehicule-component.html',
  styleUrl: './add-vehicule-component.css',
})
export class AddVehiculeComponent {

  private vehicleService = inject(VehiculeService);
  private router = inject(Router);

  newVehicle: VehicleRequestDTO = {
    registration: '',
    model: '',
    mark: '',
    typePermit: 'B'
  };

  isSubmitting = false;

  onSubmit(): void {
    this.isSubmitting = true;

    this.vehicleService.createVehicle(this.newVehicle).subscribe({
      next: (savedVehicle) => {
        this.isSubmitting = false;
        alert(`Le véhicule immatriculé ${savedVehicle.registration} a bien été enregistré.`);

        this.router.navigate(['/admin/vehicles/list']);
      },
      error: (err) => {
        this.isSubmitting = false;
        console.error("Erreur d'enregistrement :", err);

        const errorMsg = err.error?.message || "Impossible d'enregistrer le véhicule.";
        alert(errorMsg);
      }
    });
  }

}
