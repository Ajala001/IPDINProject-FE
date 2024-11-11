import { Component, inject } from '@angular/core';
import { TrainingServiceService } from '../../../services/training_service/training-service.service';
import { Router, RouterLink } from '@angular/router';
import { TrainingResponseModel } from '../../../models/classes/training';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { SearchQueryModel } from '../../../models/classes/searchQuery';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth_service/auth.service';

@Component({
  selector: 'app-training-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './training-list.component.html',
  styleUrl: './training-list.component.css'
})
export class TrainingListComponent {

  isAdmin: boolean = false;
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";
  
  trainingService = inject(TrainingServiceService);
  router = inject(Router);

  totalTrainings: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: TrainingResponseModel[] = [];
  isSearchMode: boolean = false;

  constructor(){
    this.checkUserRole();
  }

  ngOnInit() {
    this.getTrainings(); // Fetch the initial set of training on component initialization
  }

  getTrainings() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.trainingService.getTrainings(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        console.log(response.data)
        this.paginatedData = response.data;
        this.totalTrainings = response.totalRecords;
        this.router.navigateByUrl("trainings");
      } else {
        alert(response.message);
        this.router.navigateByUrl("dashboard");
      }
    });
  }

  trainingCategoryMap: { [key: number]: string } = {
    1: 'Technician',
    2: 'Affliate',
    3: 'Fellow',
    4: 'Honorary'
  };

  trainingStatusMap: { [key: number]: string } = {
    1: 'Scheduled',
    2: 'Upcoming',
    3: 'Ongoing',
    4: 'Completed',
    5: 'Cancelled'
  };

 

  // Adjust page size and decide whether to search or get all courses
  onPageSizeChange() {
    this.pageNumber = 1; // Reset to the first page when page size changes

    // Check if the search query exists; if it does, search. If not, get all courses
    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.searchTrainings();  // Search if there is a search query
    } else {
      this.getTrainings();     // Otherwise, fetch all courses
    }
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalTrainings) { 
      this.pageNumber++;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchTrainings();  // Fetch search results if in search mode
      } else {
        this.getTrainings();   
      }
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchTrainings();  // Fetch search results if in search mode
      } else {
        this.getTrainings();     // Otherwise, fetch all courses
      }
    }
  }


  params: SearchQueryModel = new SearchQueryModel
  searchTrainings() {
    this.params.pageNumber = this.pageNumber;
    this.params.pageSize = this.pageSize;

    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.trainingService.searchTrainings(this.params).subscribe((response: pagedResponse) => {
        if (response.isSuccessful) {
          this.paginatedData = response.data;
          this.totalTrainings = response.totalRecords;
        } else {
          alert(response.message);
          this.router.navigateByUrl("dashboard"); // Navigate to dashboard on error
        }
      });
    } else {
      // If search query is empty, fetch all courses
      this.getTrainings();
    }
  }
  
  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
}

