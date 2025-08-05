import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApplicationServiceService } from '../../../core/services/application/application-service.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ApplicationResponseModel, ApplicationSearchModel } from '../../../shared/models/classes/application';
import { pagedResponse } from '../../../shared/models/interfaces/pagedResponse';

@Component({
    selector: 'app-application-list',
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: './application-list.component.html',
    styleUrl: './application-list.component.css'
})
export class ApplicationListComponent implements OnInit{
  applicationService = inject(ApplicationServiceService);
  router = inject(Router);

  isAdmin: boolean = false;
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";

  constructor(){
    this.checkUserRole();
  }

  totalApplications: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: ApplicationResponseModel[] = [];
  isSearchMode: boolean = false;

  ngOnInit() {
    this.getApplications(); // Fetch the initial set of courses on component initialization
  }

  getApplications() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.applicationService.getApplications(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalApplications = response.totalRecords;
        this.router.navigateByUrl("applications");
      } else {
        alert(response.message);
        this.router.navigateByUrl("dashboard");
      }
    });
  }

  applicationStatusMap: { [key: number]: string } = {
    1: 'Pending',
    2: 'Accepted',
    3: 'Rejected',
  };

  getStatusLabel(status: number): string {
    return this.applicationStatusMap[status] || 'Unknown';
  }

  // Adjust page size and decide whether to search or get all courses
  onPageSizeChange() {
    this.pageNumber = 1; // Reset to the first page when page size changes

    // Check if the search query exists; if it does, search. If not, get all courses
    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.searchApplications();  // Search if there is a search query
    } else {
      this.getApplications();     // Otherwise, fetch all courses
    }
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalApplications) { 
      this.pageNumber++;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchApplications();  // Fetch search results if in search mode
      } else {
        this.getApplications();     // Otherwise, fetch all courses
      }
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchApplications();  // Fetch search results if in search mode
      } else {
        this.getApplications();     // Otherwise, fetch all courses
      }
    }
  }


  params: ApplicationSearchModel = new ApplicationSearchModel
  searchApplications() {
    this.params.pageNumber = this.pageNumber;
    this.params.pageSize = this.pageSize;

    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.applicationService.searchApplications(this.params).subscribe((response: pagedResponse) => {
        if (response.isSuccessful) {
          this.paginatedData = response.data;
          this.totalApplications = response.totalRecords;
        } else {
          alert(response.message);
          this.router.navigateByUrl("dashboard"); // Navigate to dashboard on error
        }
      });
    } else {
      // If search query is empty, fetch all courses
      this.getApplications();
    }
  }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
}
