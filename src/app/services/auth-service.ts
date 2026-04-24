import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../models/registration.models';
import { tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);
  private router = inject(Router)
  private readonly API_URL = 'http://localhost:8089/api/auth';

  // Signal pour savoir si on est connecté partout dans l'app
  currentUserSig = signal<string | null>(localStorage.getItem('access_token'));

  login(credentials: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.API_URL}/authenticate`, credentials).pipe(
      tap(res => {
        // Stockage des jetons
        localStorage.setItem('access_token', res.accessToken);
        localStorage.setItem('refresh_token', res.refreshToken);

        this.currentUserSig.set(res.accessToken);

        this.router.navigateByUrl('/dashboard');
      })
    );
  }


  userRole = computed(() => {
  const token = this.currentUserSig();
  if (!token) return null;
  try {
    const decoded: any = jwtDecode(token);
    // On cherche la clé 'role' (celle qu'on vient d'ajouter en Java)
    const roleInfo = decoded.role || decoded.authorities || decoded.roles;

    if (Array.isArray(roleInfo)) {
      return roleInfo[0].replace('ROLE_', '');
    }

    return roleInfo ? roleInfo.toString().replace('ROLE_', '') : null;
  } catch (e) {
    console.error("Erreur décodage:", e);
    return null;
  }
});

  logout() {
    localStorage.clear();
    this.currentUserSig.set(null);
    this.router.navigateByUrl('/login');
  }

}

