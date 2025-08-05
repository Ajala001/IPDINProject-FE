import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExaminationService } from '../../../core/services/examination/examination.service';
import { ExaminationResponseModel } from '../../../shared/models/classes/examination';
import { pagedResponse } from '../../../shared/models/interfaces/pagedResponse';

@Component({
    selector: 'app-user-examination-list',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './user-examination-list.component.html',
    styleUrl: './user-examination-list.component.css'
})
export class UserExaminationListComponent {

  examinationService = inject(ExaminationService);
  router = inject(Router);

  totalExams: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: ExaminationResponseModel[] = [];
  isSearchMode: boolean = false;


  ngOnInit() {
    this.getUserExaminations(); // Fetch the initial set of examinations on component initialization
  }

  getUserExaminations() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.examinationService.getUserExaminations(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalExams = response.totalRecords;
        
        if (this.paginatedData.length === 0) {
          // Display a message if no applications found
          alert('No examinations found.');
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
      this.getUserExaminations();  
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalExams + this.pageSize) {
      this.pageNumber++;
      this.getUserExaminations();
    }    
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
        this.getUserExaminations();     // Otherwise, fetch all courses
    }
  }
}
