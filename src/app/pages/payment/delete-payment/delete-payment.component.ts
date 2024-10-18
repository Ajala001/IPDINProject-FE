import { Component, inject } from '@angular/core';
import { PaymentServiceService } from '../../../services/payment_service/payment-service.service';
import { PaymentResponseModel } from '../../../models/classes/payment';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-payment.component.html',
  styleUrl: './delete-payment.component.css'
})
export class DeletePaymentComponent {
  
  paymentRef: string | null = null;
  payment: PaymentResponseModel | null = null;
  paymentService = inject(PaymentServiceService)
  router = inject(Router);
  route = inject(ActivatedRoute);

  paymentStatusMap: { [key: number]: string } = {
    1: 'Successful',
    2: 'Failed',
  };


  ngOnInit(): void {
    this.paymentRef = this.route.snapshot.paramMap.get('refNo');

    if (this.paymentRef) {
      this.paymentService.getPaymentByRefno(this.paymentRef).subscribe({
        next: (res) => {
          this.payment = res.data; // Assuming your API returns the payment details
        },
        error: (error) => {
          console.error('Error fetching payment:', error);
          alert('Could not fetch payment details.');
        }
      });
    }
  }

  confirmDelete(): void {
    if (this.paymentRef) {
      if (confirm(`Are you sure you want to delete ${this.payment?.payerFullName} payment?`)) {
        this.paymentService.deletePayment(this.paymentRef).subscribe({
          next: () => {
            alert('Payment deleted successfully!');
            this.router.navigate(['/payments']);
          },
          error: (error) => {
            alert('An error occurred while deleting the payment.');
            console.error('Delete error:', error);
          },
        });
      }
    }
  }

  cancelDelete(): void {
    this.router.navigate(['/payments']); // Navigate back to the payments list
  }
}
