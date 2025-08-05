import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaymentServiceService } from '../../../core/services/payment/payment-service.service';
import { PaymentResponseModel } from '../../../shared/models/classes/payment';
import { pagedResponse } from '../../../shared/models/interfaces/pagedResponse';

@Component({
    selector: 'app-user-payment-list',
    imports: [CommonModule, RouterModule, FormsModule],
    templateUrl: './user-payment-list.component.html',
    styleUrl: './user-payment-list.component.css'
})
export class UserPaymentListComponent {
  paymentService = inject(PaymentServiceService);
  router = inject(Router);

  totalPayments: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: PaymentResponseModel[] = [];
  isSearchMode: boolean = false;
  
  ngOnInit() {
    this.getUserPayments(); // Fetch the initial set of Payments on component initialization
  }

  getUserPayments() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.paymentService.getUserPayments(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalPayments = response.totalRecords;
        
        if (this.paginatedData.length === 0) {
          // Display a message if no applications found
          alert('No payments found.');
        }
      } else {
        // Handle errors with better UX
        this.displayErrorMessage(response.message);
      }
    });
  }

  displayErrorMessage(message: string) {
    // Example: You could replace this with a toast message or an in-page error
    console.error(message);
  }

  onPageSizeChange() {
    this.pageNumber = 1; // Reset to the first page when page size changes
      this.getUserPayments();  
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalPayments + this.pageSize) {
      this.pageNumber++;
      this.getUserPayments();
    }    
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
        this.getUserPayments();     // Otherwise, fetch all courses
    }
  }

  paymentStatusMap: { [key: number]: string } = {
    1: 'Successful',
    2: 'Failed',
  };

  getStatusLabel(status: number): string {
    return this.paymentStatusMap[status] || 'Unknown';
  }
}
