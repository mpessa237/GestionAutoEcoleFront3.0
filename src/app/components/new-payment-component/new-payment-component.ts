import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from '../../services/payment-service';
import { PaymentMethod, PaymentResponseDTO } from '../../models/registration.models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-payment-component',
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './new-payment-component.html',
  styleUrl: './new-payment-component.css',
})
export class NewPaymentComponent implements OnInit{
 private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private paymentService = inject(PaymentService);

  paymentForm!: FormGroup;
  methods = Object.values(PaymentMethod);
  regIdFromUrl!: number;

  ngOnInit() {
    this.regIdFromUrl = Number(this.route.snapshot.paramMap.get('regId'));

    this.paymentForm = this.fb.group({
      amount: [null, [Validators.required, Validators.min(500)]],
      paymentMethod: [PaymentMethod.CASH, Validators.required],
      registrationId: [this.regIdFromUrl, Validators.required],
      note: ['']
    });
  }

  onSubmit() {
    if (this.paymentForm.valid) {
      this.paymentService.executePayment(this.paymentForm.value).subscribe({
        next: (res: PaymentResponseDTO) => {
          alert(`Succès ! Reçu : ${res.receiptNumber}\nReste : ${res.remainingBalance} CFA`);
          this.router.navigate(['/admin/all-students']);
        },
        error: (err) => alert("Erreur : " + (err.error || "Transaction impossible"))
      });
    }
  }

}
