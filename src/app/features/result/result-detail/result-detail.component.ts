
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { ResultServiceService } from '../../../core/services/result/result-service.service';
import { ExaminationService } from '../../../core/services/examination/examination.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { StudentResultResponseDto } from '../../../shared/models/interfaces/resultResponse';
import { ExaminationResponseModel } from '../../../shared/models/classes/examination';

@Component({
    selector: 'app-result-detail',
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
  oustandingUnit: number = 0

  constructor(private route: ActivatedRoute) {
    this.checkUserRole();
  }

  ngOnInit(): void {
    this.resultId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.subscribe(params => {
      this.examId = params['examId'];
    });
    debugger;
    this.getExamById(this.examId!);
    this.getResultById(this.resultId!);
  }

  getResultById(id: string) {
    this.resultService.getResultById(id).subscribe((response: any) => {
      if (response.isSuccessful) {
        console.log(response.data)
        this.result = response.data;
        debugger;
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
        console.log(response.data);
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


  

  goBack(batchId: string, membershipNumber: string) {
    if(this.isAdmin){
      this.router.navigate(['/results'], { queryParams: { batchId: batchId, examId: this.examId } });
    }
    this.router.navigate(['/results'], { queryParams: { membershipNum: membershipNumber } });
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
  

  public downloadResult() {
    const data = document.getElementById('result');
    if (data) {
      html2canvas(data, { 
        scale: 2, 
        useCORS: true 
      }).then(canvas => {
        // Append the canvas for debugging (remove this after testing)
        document.body.appendChild(canvas);
        
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
  
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;
        const ratio = Math.min(pageWidth / canvasWidth, pageHeight / canvasHeight);
  
        const imgWidth = canvasWidth * ratio;
        const imgHeight = canvasHeight * ratio;
        const xOffset = (pageWidth - imgWidth) / 2;
  
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', xOffset, 0, imgWidth, imgHeight);
        pdf.save('Result.pdf');
  
        // Remove the appended canvas after downloading the PDF
        document.body.removeChild(canvas);
      }).catch(error => {
        console.error('Error generating PDF:', error);
      });
    } else {
      console.error('Element with id "result" not found.');
    }
  }  
}

