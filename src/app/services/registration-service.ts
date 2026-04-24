import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegistrationRequest, RegistrationResponse, StudentResponse } from '../models/registration.models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  private apiUrl = 'http://localhost:8089/api/admin/registrations';

  constructor(private http: HttpClient) { }

  registerStudent(data: RegistrationRequest): Observable<RegistrationResponse> {
    return this.http.post<RegistrationResponse>(`${this.apiUrl}/create`, data);
  }

  // registration.service.ts
getAllStudents() {
  return this.http.get<StudentResponse[]>(`${this.apiUrl}/all`);
}


disableStudent(userId: number) {
  return this.http.patch(`${this.apiUrl}/${userId}/disable`, {}, { responseType: 'text' });
}

enableStudent(userId: number) {
  return this.http.patch(`${this.apiUrl}/${userId}/enable`, {}, { responseType: 'text' });
}

patchUpdateStudent(userId: number, updates: any) {
  return this.http.patch<StudentResponse>(`${this.apiUrl}/${userId}/update`, updates);
}

}
