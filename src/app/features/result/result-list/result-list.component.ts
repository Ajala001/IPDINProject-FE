import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResultServiceService } from '../../../core/services/result/result-service.service';
import { ExaminationService } from '../../../core/services/examination/examination.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { pagedResponse } from '../../../shared/models/interfaces/pagedResponse';
import { StudentResultResponseDto } from '../../../shared/models/interfaces/resultResponse';
import { ExaminationResponseModel } from '../../../shared/models/classes/examination';


@Component({
    selector: 'app-result-list',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './result-list.component.html',
    styleUrl: './result-list.component.css'
})
export class ResultListComponent implements OnInit {
  resultService = inject(ResultServiceService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  examService = inject(ExaminationService);
  authService = inject(AuthService);

  exam!: ExaminationResponseModel;
  isAdmin: boolean = false;
  userDetails: any;
  role: string = "";
  batchId: string | null = null;
  examId: string | null = null;
  membershipNumber: string | null = null;

  totalCourses: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50];
  pageSize: number = 3;
  pageNumber: number = 1;
  paginatedData: StudentResultResponseDto[] = [];
  isSearchMode: boolean = false;

  constructor() {
    this.checkUserRole();
  }

  ngOnInit() {
    debugger;
    this.route.queryParams.subscribe(params => {
      this.batchId = params['batchId'];
      this.examId = params['examId'];
      debugger;
      this.membershipNumber = params['membershipNum'];
    });

    if (this.batchId && this.examId) {
      this.getBatchResults();
      this.getExamById(this.examId);
    }

    if (this.membershipNumber) {
      this.getStudentResults();
    }
  }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }

  getBatchResults() {
    if (!this.batchId) {
      alert("Batch ID is required.");
      this.router.navigateByUrl("dashboard");
      return;
    }

    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.resultService.getResults(this.batchId, params).subscribe({
      next: (response: pagedResponse) => {
        if (response.isSuccessful) {
          this.paginatedData = response.data;
          this.totalCourses = response.totalRecords;
          console.log("Batch Results:", response);
        } else {
          alert(response.message);
          this.router.navigateByUrl("dashboard");
        }
      },
      error: (err) => {
        console.error("Error fetching batch results:", err);
        alert("An error occurred while fetching batch results.");
      }
    });
  }

  getStudentResults() {
    if (!this.membershipNumber) {
      alert("Membership number is required.");
      this.router.navigateByUrl("dashboard");
      return;
    }
  
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
  
    this.resultService.getStudentResults(this.membershipNumber, params).subscribe({
      next: (response: pagedResponse) => {
        if (response?.isSuccessful) {
          this.paginatedData = response.data || [];
          this.totalCourses = response.totalRecords || 0;
          console.log("Student Results:", response);
  
          // Ensure examId is valid before assigning it and calling getExamById
          if (Array.isArray(response.data) && response.data.length > 0 && typeof response.data[0]?.examId === "string") {
            this.examId = response.data[0].examId;
            this.getExamById(this.examId!);
          } else {
            console.warn("No valid examId found in the response.");
          }
        } else {
          alert(response?.message || "An error occurred while fetching results.");
          this.router.navigateByUrl("dashboard");
        }
      },
      error: (err) => {
        console.error("Error fetching student results:", err);
        alert("An error occurred while fetching student results. Please try again.");
      }
    });
  }
  
  
  
  

  getExamById(examId: string) {
    if (!examId) {
      alert("Exam ID is required.");
      this.router.navigateByUrl("dashboard");
      return;
    }

    this.examService.getExaminationById(examId).subscribe({
      next: (response: apiResponse) => {
        if (response.isSuccessful) {
          this.exam = response.data;
          console.log("Exam Details:", this.exam);
        }
      },
      error: (err) => {
        console.error("Error fetching exam details:", err);
        alert("An error occurred while fetching exam details.");
      }
    });
  }

  onPageSizeChange() {
    this.pageNumber = 1; // Reset to the first page when page size changes
    this.refreshResults();
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalCourses) {
      this.pageNumber++;
      this.refreshResults();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.refreshResults();
    }
  }

  refreshResults() {
    if (this.membershipNumber) {
      this.getStudentResults();
    } else if (this.batchId && this.examId) {
      this.getBatchResults();
    } else {
      alert("No valid context for results fetching.");
      this.router.navigateByUrl("dashboard");
    }
  }
}