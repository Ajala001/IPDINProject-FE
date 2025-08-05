import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ExaminationService } from '../../../core/services/examination/examination.service';
import { CourseServiceService } from '../../../core/services/course/course-service.service';
import { ExaminationResponseModel } from '../../../shared/models/classes/examination';
import { ExaminationUpdateModel } from '../../../shared/models/interfaces/examinationUpdate';
import { CourseResponseModel2 } from '../../../shared/models/classes/course';

@Component({
    selector: 'app-edit-examination',
    imports: [FormsModule, CommonModule],
    templateUrl: './edit-examination.component.html',
    styleUrl: './edit-examination.component.css'
})
export class EditExaminationComponent implements OnInit {

  years: number[] = [];

  populateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = 1900; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  route = inject(ActivatedRoute);
  examService = inject(ExaminationService);
  courseService = inject(CourseServiceService); // Inject the course service
  router = inject(Router);
  examId: string | null = null;
  pageSize: number = 0;  // Default page size
  pageNumber: number = 0; // Default page number

  examResponse: ExaminationResponseModel = {
    id: '',
    examTitle: '',
    examDate: '',
    examTime: '',
    examYear: 0,
    fee: '',
    applicationFee: '',
    status: 0,
    courses: [] // This will store the courses assigned to this exam
  };

  exam: ExaminationUpdateModel = {
    examTitle: '',
    examDateAndTime: '',
    examYear: 0,
    fee: 0,
    selectedCourses: [] // This will store selected course IDs
  };


  allCourses: CourseResponseModel2[] = []

  ngOnInit(): void {

    this.populateYears();
    // Get the examination ID from the route parameters
    this.examId = this.route.snapshot.paramMap.get('id');

    // Fetch all courses from the database first
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.courseService.getCourses(params).subscribe({
      next: (response) => {
        this.allCourses = response.data;

        // Now fetch the examination details
        if (this.examId) {
          this.examService.getExaminationById(this.examId).subscribe({
            next: (response) => {
              this.examResponse = response.data;
              const examDateAndTime = new Date(this.examResponse.examDate);
              this.exam = {
                examTitle: this.examResponse.examTitle,
                examDateAndTime: this.formatDateAndTime(examDateAndTime),
                examYear: this.examResponse.examYear,
                fee: this.cleanCurrency(this.examResponse.fee),
                selectedCourses: this.examResponse.courses.map(course => course.id), // Store selected course IDs
              };
            },
            error: (error) => {
              console.error('Error fetching Examination:', error);
              alert('Could not fetch Examination details.');
            }
          });
        }
      },
      error: (error) => {
        console.error('Error fetching all courses:', error);
        alert('Could not fetch courses.');
      }
    });
  }

  // Toggle course selection
  toggleCourseSelection(courseId: string, event: Event): void {
    const target = event.target as HTMLInputElement; // Type assertion
    const isChecked = target.checked; // Now you can safely access 'checked'

    const index = this.exam.selectedCourses.indexOf(courseId);
    console.log('Toggling course:', courseId, 'Current courses:', this.exam.selectedCourses);

    if (isChecked) {
        // Add the course if it's not already selected
        if (index === -1) {
            this.exam.selectedCourses.push(courseId);
            console.log('Course added:', this.exam.selectedCourses);
        }
    } else {
        // Remove the course if it's already selected
        if (index !== -1) {
            this.exam.selectedCourses.splice(index, 1);
            console.log('Course removed:', this.exam.selectedCourses);
        }
    }
}

updateExamination(): void {
  if (this.examId && this.exam) {
      if (confirm(`Are you sure you want to update the examination: ${this.exam.examTitle}?`)) {
          // Send the update request with the exam object, which includes the checked course IDs
          this.examService.updateExaminationById(this.examId, this.exam).subscribe({
              next: () => {
                  alert('Examination updated successfully!');
                  this.router.navigate(['/examinations']);
              },
              error: (error) => {
                  alert('An error occurred while updating the Examination.');
                  console.error('Update error:', error);
              }
          });
      }
  }
}


  formatDateAndTime(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-indexed, so add 1
    const day = date.getDate().toString().padStart(2, '0');

    // Use local hours and minutes
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Format as YYYY-MM-DDTHH:MM
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  cleanCurrency(value: string): number {
    if (!value) return 0;
    // Remove commas and currency symbols like ₦, $, #
    const cleaned = value.replace(/[₦#$,]/g, '').trim();
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }
  
}