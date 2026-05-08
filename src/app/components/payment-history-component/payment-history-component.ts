import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PaymentService } from '../../services/payment-service';
import { CommonModule } from '@angular/common';
import { PaymentResponseDTO } from '../../models/registration.models';

@Component({
  selector: 'app-payment-history-component',
  imports: [CommonModule],
  templateUrl: './payment-history-component.html',
  styleUrl: './payment-history-component.css',
})
export class PaymentHistoryComponent implements OnInit{
payments: PaymentResponseDTO[] = [];
  registrationId!: number;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService
  ) {}

ngOnInit(): void {
  // On utilise 'regId' car c'est le nom dans ton fichier de routes
  const idFromUrl = this.route.snapshot.paramMap.get('regId');

  if (idFromUrl) {
    this.registrationId = +idFromUrl; // Le '+' convertit la string en number

    if (!isNaN(this.registrationId)) {
      this.loadHistory();
    } else {
      console.error("L'ID récupéré n'est pas un nombre :", idFromUrl);
    }
  } else {
    console.error("Aucun paramètre 'regId' trouvé dans l'URL");
  }
}

  loadHistory() {
    this.paymentService.getPaymentHistory(this.registrationId).subscribe({
      next: (data) => this.payments = data,
      error: (err) => console.error('Erreur lors du chargement', err)
    });
  }
}
