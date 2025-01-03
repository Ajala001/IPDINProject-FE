import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResultServiceService } from '../../../services/result_service/result-service.service';
import { AuthService } from '../../../services/auth_service/auth.service';
import { StudentResultResponseDto } from '../../../models/interfaces/resultResponse';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { SearchQueryModel } from '../../../models/classes/searchQuery';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExaminationService } from '../../../services/examination_service/examination.service';
import { ExaminationResponseModel } from '../../../models/classes/examination';
import { apiResponse } from '../../../models/interfaces/apiResponse';

@Component({
  selector: 'app-result-list',
  standalone: true,
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
    this.route.queryParams.subscribe(params => {
      this.batchId = params['batchId'];
      this.examId = params['examId'];
      this.membershipNumber = params['membershipNumber'];
    });

    if (this.batchId && this.examId) {
      this.getBatchResults();
      this.getExamById();
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
        if (response.isSuccessful) {
          this.paginatedData = response.data;
          this.totalCourses = response.totalRecords;
          console.log("Student Results:", response);
        } else {
          alert(response.message);
          this.router.navigateByUrl("dashboard");
        }
      },
      error: (err) => {
        console.error("Error fetching student results:", err);
        alert("An error occurred while fetching student results.");
      }
    });
  }

  getExamById() {
    if (!this.examId) {
      alert("Exam ID is required.");
      this.router.navigateByUrl("dashboard");
      return;
    }

    this.examService.getExaminationById(this.examId).subscribe({
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