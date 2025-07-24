import { Component, inject } from '@angular/core';
import { ExaminationResponseModel } from '../../../models/classes/examination';
import { ExaminationService } from '../../../services/examination_service/examination.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-delete-examination',
    imports: [CommonModule, RouterModule],
    templateUrl: './delete-examination.component.html',
    styleUrl: './delete-examination.component.css'
})
export class DeleteExaminationComponent {

  examId: string | null = null;
  exam: ExaminationResponseModel | null = null; // Replace with your course type

  examService = inject(ExaminationService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    // Get the course ID from the route parameters
    this.examId = this.route.snapshot.paramMap.get('id');

    // Fetch the course details using the course ID
    if (this.examId) {
      this.examService.getExaminationById(this.examId).subscribe({
        next: (exam) => {
          this.exam = exam.data; // Assuming your API returns the course details
        },
        error: (error) => {
          console.error('Error fetching exam:', error);
          alert('Could not fetch exam details.');
        }
      });
    }
  }

  confirmDelete(): void {
    if (this.examId) {
      if (confirm(`Are you sure you want to delete the exam: ${this.exam?.examTitle}?`)) {
        this.examService.deleteExaminationById(this.examId).subscribe({
          next: () => {
            alert('Examination deleted successfully!');
            this.router.navigate(['/examinations']);
          },
          error: (error) => {
            alert('An error occurred while deleting the exam.');
            console.error('Delete error:', error);
          },
        });
      }
    }
  }

  cancelDelete(): void {
    this.router.navigate(['/examinations']); // Navigate back to the examination list
  }
}
