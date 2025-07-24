import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaymentServiceService } from '../../../services/payment_service/payment-service.service';
import { CommonModule } from '@angular/common';
import { apiResponse } from '../../../models/interfaces/apiResponse';

@Component({
    selector: 'app-verify-payment',
    imports: [CommonModule],
    templateUrl: './verify-payment.component.html',
    styleUrl: './verify-payment.component.css'
})
export class VerifyPaymentComponent implements OnInit {
  verifyingPayment: boolean = true;
  paymentSuccess: boolean | null = null;
  paymentRef: string = '';
  applicationId: string ='';
  applicationType: string = '';

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentServiceService // Service to handle payment verification
  ) { }

  ngOnInit(): void {
    debugger;
    this.paymentRef = this.route.snapshot.queryParamMap.get('reference') || '';
    this.applicationId = this.route.snapshot.queryParamMap.get('applicationId') || '';
    this.applicationType = this.route.snapshot.queryParamMap.get('reason') || '';
    if (this.paymentRef) {
      this.verifyPayment();
    } else {
      this.verifyingPayment = false;
      this.paymentSuccess = false;
    }
  }

  

  verifyPayment(): void {
    debugger;
    console.log(this.paymentRef)
    this.paymentService.verifyPayment(this.paymentRef).subscribe({
      next: (response: apiResponse) => {
        this.verifyingPayment = false;
        if (response.isSuccessful) {
          this.paymentSuccess = true;
        } else {
          this.paymentSuccess = false;
        }
      },
      error: (error) => {
        this.verifyingPayment = false;
        this.paymentSuccess = false;
        console.error('Error verifying payment', error);
      },
      complete: () => {
      }
    });
  }
}  