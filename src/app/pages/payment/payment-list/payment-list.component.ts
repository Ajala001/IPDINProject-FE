import { Component, inject } from '@angular/core';
import { PaymentServiceService } from '../../../services/payment_service/payment-service.service';
import { PaymentResponseModel } from '../../../models/classes/payment';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { Router, RouterLink } from '@angular/router';
import { SearchQueryModel } from '../../../models/classes/searchQuery';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth_service/auth.service';

@Component({
  selector: 'app-payment-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './payment-list.component.html',
  styleUrl: './payment-list.component.css'
})
export class PaymentListComponent {

  paymentService = inject(PaymentServiceService);
  router = inject(Router);

  isAdmin: boolean = false;
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";

  totalPayments: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: PaymentResponseModel[] = [];
  isSearchMode: boolean = false;

  constructor(){
    this.checkUserRole();
  }
  
  ngOnInit() {
    this.getPayments(); // Fetch the initial set of Payments on component initialization
  }

  getPayments() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.paymentService.getPayments(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalPayments = response.totalRecords;
        this.router.navigateByUrl("payments");
      } else {
        alert(response.message);
        this.router.navigateByUrl("dashboard");
      }
    });
  }

  paymentStatusMap: { [key: number]: string } = {
    1: 'Successful',
    2: 'Failed',
  };

  getStatusLabel(status: number): string {
    return this.paymentStatusMap[status] || 'Unknown';
  }

  // Adjust page size and decide whether to search or get all courses
  onPageSizeChange() {
    this.pageNumber = 1; // Reset to the first page when page size changes

    // Check if the search query exists; if it does, search. If not, get all payments
    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.searchPayments();  // Search if there is a search query
    } else {
      this.getPayments();     // Otherwise, fetch all courses
    }
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalPayments) { 
      this.pageNumber++;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchPayments();  // Fetch search results if in search mode
      } else {
        this.getPayments();     // Otherwise, fetch all courses
      }
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchPayments();  // Fetch search results if in search mode
      } else {
        this.getPayments();     // Otherwise, fetch all courses
      }
    }
  }


  params: SearchQueryModel = new SearchQueryModel
  searchPayments() {
    debugger;
    this.params.pageNumber = this.pageNumber;
    this.params.pageSize = this.pageSize;

    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.paymentService.searchPayments(this.params).subscribe((response: pagedResponse) => {
        if (response.isSuccessful) {
          this.paginatedData = response.data;
          this.totalPayments = response.totalRecords;
        } else {
          alert(response.message);
          this.router.navigateByUrl("dashboard"); // Navigate to dashboard on error
        }
      });
    } else {
      // If search query is empty, fetch all courses
      this.getPayments();
    }
  }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
}
