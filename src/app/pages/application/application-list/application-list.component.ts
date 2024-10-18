import { Component, inject, OnInit } from '@angular/core';
import { ApplicationServiceService } from '../../../services/application_service/application-service.service';
import { Router, RouterLink } from '@angular/router';
import { ApplicationResponseModel, ApplicationSearchModel } from '../../../models/classes/application';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-application-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './application-list.component.html',
  styleUrl: './application-list.component.css'
})
export class ApplicationListComponent implements OnInit{
  applicationService = inject(ApplicationServiceService);
  router = inject(Router);


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
    1: 'Active',
    2: 'Inactive',
    3: 'Upcoming',
    4: 'Completed',
    5: 'Cancelled'
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
}
