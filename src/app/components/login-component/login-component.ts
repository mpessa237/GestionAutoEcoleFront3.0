import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  errorMessage: string | null = null;

onSubmit() {
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.getRawValue() as any).subscribe({
      next: (response) => {
        console.log('Connexion réussie !');
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.errorMessage = "Identifiants invalides";
      }
    });
  }
}

}
