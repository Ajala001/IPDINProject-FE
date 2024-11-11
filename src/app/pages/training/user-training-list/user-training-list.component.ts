import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TrainingServiceService } from '../../../services/training_service/training-service.service';
import { TrainingResponseModel } from '../../../models/classes/training';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';

@Component({
  selector: 'app-user-training-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './user-training-list.component.html',
  styleUrl: './user-training-list.component.css'
})
export class UserTrainingListComponent {
  
  trainingService = inject(TrainingServiceService);
  router = inject(Router);

  totalTrainings: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: TrainingResponseModel[] = [];
  isSearchMode: boolean = false;


  ngOnInit() {
    this.getUserTrainings(); // Fetch the initial set of training on component initialization
  }

  getUserTrainings() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.trainingService.getUserTrainings(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalTrainings = response.totalRecords;
        
        if (this.paginatedData.length === 0) {
          // Display a message if no applications found
          alert('No trainings found.');
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
      this.getUserTrainings();  
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalTrainings + this.pageSize) {
      this.pageNumber++;
      this.getUserTrainings();
    }    
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
        this.getUserTrainings();     // Otherwise, fetch all courses
    }
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
}
