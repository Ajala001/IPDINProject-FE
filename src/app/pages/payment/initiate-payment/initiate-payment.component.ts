import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { PaymentServiceService } from '../../../services/payment_service/payment-service.service';
import { PaymentModel } from '../../../models/classes/payment';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { apiResponse } from '../../../models/interfaces/apiResponse';

@Component({
  selector: 'app-initiate-payment',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './initiate-payment.component.html',
  styleUrl: './initiate-payment.component.css'
})
export class InitiatePaymentComponent implements OnInit {
  paymentReason: string = ''; 
  selectedItemId: string = '';
  authorizationUrl: string | null = null;
  router = inject(Router)

  constructor(
    private paymentService: PaymentServiceService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.paymentReason = this.route.snapshot.queryParamMap.get('reason') || '';
    this.selectedItemId = this.route.snapshot.paramMap.get('id') || '';
    this.initiatePayment();
  }

  initiatePayment(): void {
    const paymentData: PaymentModel = {
      reasonForPayment: this.paymentReason,
      entityId: this.selectedItemId
    };

    // Call the payment service to initiate payment
    this.paymentService.initiatePayment(paymentData).subscribe({
      next: (response: apiResponse) => {
        if (response.isSuccessful) {
          this.authorizationUrl = response.data;
          if (this.authorizationUrl) {
            window.location.href = this.authorizationUrl;     // redirect the user to the payment page
          } else {
            alert('Authorization URL is not available.'); // Handle the case when URL is not available
          }
        } else {
          alert(response.message); // Show error message if payment initiation failed
        }
      },
      error: (err) => {
        console.error('Payment initiation error', err);
        alert('Failed to initiate payment. Please try again later.'); // Show a user-friendly error message in case of failure
        this.router.navigateByUrl("dashboard");
      }
    });
  }
}