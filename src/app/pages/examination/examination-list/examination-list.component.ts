import { Component, inject } from '@angular/core';
import { ExaminationService } from '../../../services/examination_service/examination.service';
import { Router, RouterLink } from '@angular/router';
import { ExaminationResponseModel } from '../../../models/classes/examination';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { ExaminationSearchmodel } from '../../../models/classes/examinationSearch';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-examination-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './examination-list.component.html',
  styleUrl: './examination-list.component.css'
})
export class ExaminationListComponent {

  examinationService = inject(ExaminationService);
  router = inject(Router);


  totalExams: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: ExaminationResponseModel[] = [];
  isSearchMode: boolean = false;

  ngOnInit() {
    this.getExaminations(); // Fetch the initial set of examinations on component initialization
  }

  getExaminations() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.examinationService.getExaminations(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalExams = response.totalRecords;
        this.router.navigateByUrl("examinations");
      } else {
        alert(response.message);
        this.router.navigateByUrl("dashboard");
      }
    });
  }

  // Adjust page size and decide whether to search or get all examinations
  onPageSizeChange() {
    this.pageNumber = 1; // Reset to the first page when page size changes

    // Check if the search query exists; if it does, search. If not, get all examinations
    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.searchExams();  // Search if there is a search query
    } else {
      this.getExaminations();     // Otherwise, fetch all examinations
    }
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalExams) { 
      this.pageNumber++;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchExams();  // Fetch search results if in search mode
      } else {
        this.getExaminations();     // Otherwise, fetch all examinations
      }
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchExams();  // Fetch search results if in search mode
      } else {
        this.getExaminations();     // Otherwise, fetch all examinations
      }
    }
  }


  params: ExaminationSearchmodel = new ExaminationSearchmodel
  searchExams() {
    this.params.pageNumber = this.pageNumber;
    this.params.pageSize = this.pageSize;

    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.examinationService.searchExaminations(this.params).subscribe((response: pagedResponse) => {
        if (response.isSuccessful) {
          this.paginatedData = response.data;
          this.totalExams = response.totalRecords;
        } else {
          alert(response.message);
          this.router.navigateByUrl("dashboard"); // Navigate to dashboard on error
        }
      });
    } else {
      // If search query is empty, fetch all examinations
      this.getExaminations();
    }
  }
}
