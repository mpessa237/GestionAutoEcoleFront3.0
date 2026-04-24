import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaymentRequestDTO, PaymentResponseDTO } from '../models/registration.models';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {

  private http=inject(HttpClient);
  private apiUrl = 'http://localhost:8089/api/payments';

  executePayment(data: PaymentRequestDTO): Observable<PaymentResponseDTO> {
  return this.http.post<PaymentResponseDTO>(`${this.apiUrl}/execute`, data);
}

}
