import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegistrationService } from '../../services/registration-service';
import { TypePermit } from '../../models/registration.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-student-register-component',
  imports: [FormsModule,CommonModule,ReactiveFormsModule],
  templateUrl: './student-register-component.html',
  styleUrl: './student-register-component.css',
})
export class StudentRegisterComponent implements OnInit{
  registerForm!: FormGroup;
  permits = Object.values(TypePermit);

  constructor(
    private fb: FormBuilder,
    private regService: RegistrationService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      password: ['123456', Validators.required], // Mot de passe par défaut
      typePermit: ['', Validators.required],
      totalPrice: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
  if (this.registerForm.valid) {
    const formData = this.registerForm.getRawValue();

    this.regService.registerStudent(formData).subscribe({
      next: (res) => {
        alert(`Étudiant inscrit ! Numéro de dossier : ${res.fileNumber}`);
        this.registerForm.reset({
          password: '123456', // On remet le mot de passe par défaut après reset
          totalPrice: 0
        });
      },
      error: (err) => {
        console.error(err);
        // Utilise une sécurité si err.error ou err.error.message est indéfini
        const msg = err.error?.message || "Une erreur inconnue est survenue";
        alert("Erreur lors de l'inscription : " + msg);
      }
    });
  }
}

}
