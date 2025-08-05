import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PaymentServiceService } from '../../../core/services/payment/payment-service.service';
import { PaymentResponseModel } from '../../../shared/models/classes/payment';
import { AuthService } from '../../../core/services/auth/auth.service';


@Component({
  selector: 'app-delete-payment',
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

  isAdmin: boolean = false;
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";

  paymentStatusMap: { [key: number]: string } = {
    1: 'Successful',
    2: 'Failed',
  };

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }

  ngOnInit(): void {
    this.checkUserRole();
    
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
            if(this.isAdmin){
              this.router.navigate(['/payments']);
            }
            this.router.navigate(['/payments/user'])
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
    if(this.isAdmin){
      this.router.navigate(['/payments']);
    }
    this.router.navigate(['/payments/user']) // Navigate back to the payments list
  }
}
