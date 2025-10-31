import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { PaymentServiceService } from '../../../core/services/payment/payment-service.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { ExaminationService } from '../../../core/services/examination/examination.service';
import { TrainingServiceService } from '../../../core/services/training/training-service.service';
import { PaymentType, PaymentTypeLabelMap } from '../../../shared/models/enums/paymentType';
import { PaymentModel } from '../../../shared/models/classes/payment';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { CommonModule } from '@angular/common';
import { DecodedUser } from '../../../shared/models/interfaces/userUpdate';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-initiate-payment',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './initiate-payment.component.html',
  styleUrls: ['./initiate-payment.component.css']
})
export class InitiatePaymentComponent implements OnInit {
  // Fields
  serviceId: string | null = null;
  paymentType: string | null = null;
  paymentTypeNumber?: number;
  token: string | null = null;
  user: DecodedUser | null = null;

  // UI states
  showAmount = false;
  showServices = false;
  isLoading = false;
  isFetchingServices = false;

  // Data
  paymentCategories = ['Registration', 'Dues', 'Examination', 'Training', 'Seminar'];
  availableServices: { id: string, name: string, amount: number }[] = [];
  amount = 0;

  // Form
  paymentForm!: FormGroup;

  // Dependencies
  private fb = inject(FormBuilder);
  router = inject(Router);
  private route = inject(ActivatedRoute);
  private paymentService = inject(PaymentServiceService);
  private notifier = inject(NotificationService);
  private examService = inject(ExaminationService);
  private trainingService = inject(TrainingServiceService);
  private seminarService = inject(TrainingServiceService);

  ngOnInit(): void {
    this.initializeForm();
    this.handleRouteParams();
    this.loadUserInfo();
  }

  /** Initialize the reactive form */
  private initializeForm(): void {
    this.paymentForm = this.fb.group({
      paymentType: ['', Validators.required],
      service: ['']
    });

    this.paymentForm.get('paymentType')?.valueChanges.subscribe(type => this.onPaymentTypeChange(type));
  }

  /** Extract route parameters and query params */
  private handleRouteParams(): void {
    combineLatest([this.route.paramMap, this.route.queryParamMap]).subscribe({
      next: ([params, queryParams]) => {
        this.serviceId = params.get('id');
        this.paymentType = queryParams.get('paymentType');
        this.token = queryParams.get('token');

        if (this.paymentType) {
          this.paymentForm.patchValue({ paymentType: this.paymentType });
          this.onPaymentTypeChange(this.paymentType);
        }
      },
      error: err => {
        console.error('Failed to get route parameters', err);
        this.notifier.show('An error occurred while loading the payment page.');
      }
    });
  }

  /** When payment category changes */
  onPaymentCategoryChange(): void {
    const type = this.paymentForm.value.paymentType;
    this.onPaymentTypeChange(type);
  }

  /** Handle when user changes payment type */
  onPaymentTypeChange(type: string): void {
    this.showServices = ['Examination', 'Training', 'Seminar'].includes(type);
    this.showAmount = ['Registration', 'Dues'].includes(type);
    this.amount = 0;
    this.availableServices = [];

    // Reset service field
    this.paymentForm.get('service')?.reset();

    if (this.showAmount) {
      // Fixed categories
      this.amount = type === 'Registration' ? 5000 : 2000;
    } else if (this.showServices) {
      // Fetch available services dynamically
      this.loadServicesByType(type);
    }
  }

  /** Load available services based on type */
 private loadServicesByType(type: string): void {
  this.isFetchingServices = true;
  let fetch$;

  switch (type) {
    case 'Examination':
      fetch$ = this.examService.getExaminations({ pageNumber: 1, pageSize: 50 });
      break;
    case 'Training':
      fetch$ = this.trainingService.getTrainings({ pageNumber: 1, pageSize: 50 });
      break;
    case 'Seminar':
      fetch$ = this.seminarService.getTrainings({ pageNumber: 1, pageSize: 50 });
      break;
    default:
      this.showAmount = true;
        this.amount = 5000; // Example static amount for other categories
        return;
  }

  if (fetch$) {
    fetch$.subscribe({
      next: (res: any) => {
        this.isFetchingServices = false;
        if (res.isSuccessful && Array.isArray(res.data?.items)) {
          this.availableServices = res.data.items.map((item: any) => ({
            id: item.id,
            name: item.title || item.name,
            amount: item.fee || item.amount || 0
          }));
        } else {
          this.availableServices = [];
        }
      },
      error: err => {
        this.isFetchingServices = false;
        this.availableServices = [];
        const msg = err.error?.message || 'Failed to load services. Please try again.';
        this.notifier.show(msg);
      }
    });
  } else {
    this.isFetchingServices = false;
    this.availableServices = [];
  }
}

  /** Get selected service name */
  getSelectedServiceName(): string {
    const selectedId = this.paymentForm.value.service;
    const service = this.availableServices.find(s => s.id === selectedId);
    return service ? service.name : '';
  }

  /** Get selected service amount */
  getSelectedServiceAmount(): number {
    const selectedId = this.paymentForm.value.service;
    const service = this.availableServices.find(s => s.id === selectedId);
    return service ? service.amount : 0;
  }

  /** Form submission */
  onSubmit(): void {
    if (this.paymentForm.invalid) {
      this.notifier.show('Please select a valid payment option.');
      return;
    }

    const selectedType = this.paymentForm.value.paymentType;
    const selectedService = this.paymentForm.value.service;

    this.paymentTypeNumber = this.getPaymentTypeNumber(selectedType);
    if (this.paymentTypeNumber === undefined) {
      this.notifier.show('Invalid payment type.');
      return;
    }

    this.serviceId = this.showServices
      ? selectedService
      : this.serviceId ?? 'fixed-service';

    if (!this.serviceId) {
      this.notifier.show('Service ID is missing.');
      return;
    }

    this.initiatePayment();
  }

  /** Map label to enum number */
  private getPaymentTypeNumber(type: string): PaymentType | undefined {
    const match = Object.entries(PaymentTypeLabelMap)
      .find(([, label]) => label.toLowerCase() === type.toLowerCase());
    return match ? Number(match[0]) as PaymentType : undefined;
  }

  /** Initiate payment request */
  private initiatePayment(): void {
    if (!this.serviceId || this.paymentTypeNumber === undefined) {
      this.notifier.show('Cannot initiate payment: missing required parameters.');
      return;
    }

    this.isLoading = true;

    const paymentData: PaymentModel = {
      serviceId: this.serviceId,
      paymentType: this.paymentTypeNumber
    };

    this.paymentService.initiatePayment(paymentData, this.token ?? '').subscribe({
      next: (response: apiResponse) => {
        this.isLoading = false;

        if (response.isSuccessful && response.data) {
          const authorizationUrl = response.data as string;
          window.location.href = authorizationUrl;
        } else {
          this.notifier.show(response.message || 'Payment initiation failed.');
          this.router.navigateByUrl('dashboard');
        }
      },
      error: err => {
        this.isLoading = false;
        const message = err.error?.message || err.message || 'Failed to initiate payment. Please try again.';
        this.notifier.show(message);
        this.router.navigateByUrl('dashboard');
      }
    });
  }

  private loadUserInfo(): void {
    const token = localStorage.getItem('userToken');
    if (token) {
      try {
        this.user = jwtDecode<DecodedUser>(token);
      } catch {
        this.user = null;
      }
    }
  }
}
