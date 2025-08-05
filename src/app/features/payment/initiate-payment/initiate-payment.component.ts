import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { PaymentServiceService } from '../../../core/services/payment/payment-service.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { PaymentType, PaymentTypeLabelMap } from '../../../shared/models/enums/paymentType';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { PaymentModel } from '../../../shared/models/classes/payment';


@Component({
  selector: 'app-initiate-payment',
  templateUrl: './initiate-payment.component.html',
  styleUrls: ['./initiate-payment.component.css']
})
export class InitiatePaymentComponent implements OnInit {
  serviceId: string | null = null;
  paymentType: string | null = null;
  authorizationUrl: string | null = null;
  paymentTypeNumber?: number;
  token: string | null = null;

  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private paymentService = inject(PaymentServiceService);
  private notifier = inject(NotificationService)


  ngOnInit(): void {
    // Combine paramMap and queryParamMap to handle all route data at once
    combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe({
      next: ([params, queryParams]) => {
        this.serviceId = params.get('id') || null;
        this.paymentType = queryParams.get('paymentType') || null;
        this.token = queryParams.get('token') || null;

        if (!this.serviceId) {
          console.error('Service ID is missing.');
          return;
        }

        if (!this.paymentType) {
          console.error('Payment type is missing.');
          return;
        }

        debugger;

        this.paymentTypeNumber = this.getPaymentTypeNumber(this.paymentType);

        if (this.paymentTypeNumber === undefined) {
          console.error(`Invalid payment type: ${this.paymentType}`);
          return;
        }

        this.initiatePayment();
      },
      error: err => {
        console.error('Failed to get route parameters', err);
      }
    });
  }

  private getPaymentTypeNumber(type: string): PaymentType | undefined {
    const entry = Object.entries(PaymentTypeLabelMap).find(
      ([, label]) => label.toLowerCase() === type.toLowerCase()
    );
    return entry ? Number(entry[0]) as PaymentType : undefined;
  }

  private initiatePayment(): void {
    if (!this.serviceId || this.paymentTypeNumber === undefined) {
      this.notifier.show('Cannot initiate payment: missing required parameters.');
      return;
    }

    const paymentData: PaymentModel = {
      serviceId: this.serviceId,
      paymentType: this.paymentTypeNumber
    };

    this.paymentService.initiatePayment(paymentData, this.token ?? '').subscribe({
      next: (response: apiResponse) => {
        if (response.isSuccessful && response.data) {
          this.authorizationUrl = response.data;

          if (this.authorizationUrl) {
            window.location.href = this.authorizationUrl;
          } else {
            alert('Authorization URL is not available.');
          }
        } else {
          this.notifier.show(response.message || 'Payment initiation failed.');
          this.router.navigateByUrl('dashboard');
        }
      },
      error: (err) => {

        const backendMessage =
          err.error?.message ||
          err.message ||
          'Failed to initiate payment. Please try again later.';
          this.notifier.show(backendMessage);
        this.router.navigateByUrl('dashboard');
      }
    });
  }
}
