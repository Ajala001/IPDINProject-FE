import { Component, inject, OnInit } from '@angular/core';
import { ApplicationServiceService } from '../../../services/application_service/application-service.service';
import { Router, RouterModule } from '@angular/router';
import { ApplicationResponseModel } from '../../../models/classes/application';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-application-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './user-application-list.component.html',
  styleUrl: './user-application-list.component.css'
})
export class UserApplicationListComponent implements OnInit{

  applicationService = inject(ApplicationServiceService);
  router = inject(Router);

  totalApplications: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: ApplicationResponseModel[] = [];
  isSearchMode: boolean = false;

  ngOnInit() {
    this.getUserApplications(); // Fetch the initial set of courses on component initialization
  }

  getUserApplications() {
  const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
  this.applicationService.getUserApplications(params).subscribe((response: pagedResponse) => {
    if (response.isSuccessful) {
      this.paginatedData = response.data;
      this.totalApplications = response.totalRecords;
      
      if (this.paginatedData.length === 0) {
        // Display a message if no applications found
        alert('No applications found.');
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
      this.getUserApplications();  
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalApplications + this.pageSize) {
      this.pageNumber++;
      this.getUserApplications();
    }    
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
        this.getUserApplications();     // Otherwise, fetch all courses
    }
  }

}
