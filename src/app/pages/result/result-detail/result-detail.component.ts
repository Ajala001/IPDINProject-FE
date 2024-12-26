import { Component, inject, OnInit } from '@angular/core';
import { ResultServiceService } from '../../../services/result_service/result-service.service';
import { StudentResultResponseDto } from '../../../models/interfaces/resultResponse';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth_service/auth.service';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { ExaminationService } from '../../../services/examination_service/examination.service';
import { ExaminationResponseModel } from '../../../models/classes/examination';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-result-detail',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './result-detail.component.html',
  styleUrl: './result-detail.component.css'
})
export class ResultDetailComponent implements OnInit {
  router = inject(Router);
  resultId: string | null = null;
  examId: string | null = null;
  resultService = inject(ResultServiceService);
  result!: StudentResultResponseDto;
  examService = inject(ExaminationService);
  exam!: ExaminationResponseModel;
  isAdmin: boolean = false;
  authService = inject(AuthService);
  userDetails: any;
  role: string = "";
  parsedBreakdown: { [code: string]: number } = {};

  constructor(private route: ActivatedRoute) {
    this.checkUserRole();
  }

  ngOnInit(): void {
    this.resultId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.examId = params['examId'];
    });
    this.getResultById(this.resultId!);
    this.getExamById(this.examId!);
  }

  getResultById(id: string) {
    this.resultService.getResultById(id).subscribe((response: any) => {
      if (response.isSuccessful) {
        this.result = response.data;
        this.parsedBreakdown = JSON.parse(this.result.breakdown); // Parse breakdown JSON
        console.log(this.parsedBreakdown);
  
        // Perform GPA calculations if exam data is already available
        if (this.exam) {
          this.calculateSummary();
        }
      }
    });
  }
  
  getExamById(id: string) {
    this.examService.getExaminationById(id).subscribe((response: any) => {
      if (response.isSuccessful) {
        this.exam = response.data;
  
        // Perform GPA calculations if result data is already available
        if (this.result) {
          this.calculateSummary();
        }
      }
    });
  }
  

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }


  calculateGrade(score: number): { grade: string, gradePoint: number } {
    if (score >= 70) return { grade: 'A', gradePoint: 5 };
    if (score >= 60) return { grade: 'B', gradePoint: 4 };
    if (score >= 50) return { grade: 'C', gradePoint: 3 };
    if (score >= 45) return { grade: 'D', gradePoint: 2 };
    return { grade: 'F', gradePoint: 0 };
  }

  calculateGP(score: number, unit: number): number {
    const { gradePoint } = this.calculateGrade(score);
    return gradePoint * unit;
  }

  totalGradePoints: number = 0;
  totalUnits: number = 0

  getOverallGPA(): number {
  return this.totalUnits > 0 ? this.totalGradePoints / this.totalUnits : 0;
}


  onDownloadClick(resultId: string) {
    this.resultService.downloadResult(resultId).subscribe((response: Blob) => {
      const url = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Result.pdf';
      link.click();
      window.URL.revokeObjectURL(url); // Clean up
    });
  }

  goBack(batchId: string) {
    debugger;
    this.router.navigate(['/results', batchId]);
  }

  calculateSummary() {
    this.totalGradePoints = 0;
    this.totalUnits = 0;
  
    this.exam.courses.forEach(course => {
      const score = this.parsedBreakdown[course.courseCode] || 0;
      const gradePoint = this.calculateGP(score, +course.courseUnit);
      this.totalGradePoints += gradePoint; // Add grade points
      this.totalUnits += +course.courseUnit; // Accumulate course units
    });
  }
  

}
