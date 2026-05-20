import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VehicleRequestDTO, VehicleResponseDTO } from '../models/registration.models';

@Injectable({
  providedIn: 'root',
})
export class VehiculeService {

  private http = inject(HttpClient)

  private apiUrl = 'http://localhost:8089/api/vehicles';

  getAllVehicles(): Observable<VehicleResponseDTO[]> {
    return this.http.get<VehicleResponseDTO[]>(this.apiUrl);
  }

  createVehicle(vehicle: VehicleRequestDTO): Observable<VehicleResponseDTO> {
    return this.http.post<VehicleResponseDTO>(this.apiUrl, vehicle);
  }

}
