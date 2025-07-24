import { Component, inject } from '@angular/core';
import { BatchResultResponseDto } from '../../../models/interfaces/resultResponse';
import { BatchResultService } from '../../../services/batch-result_service/batch-result.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-delet-batch-result',
    imports: [FormsModule, CommonModule, RouterModule],
    templateUrl: './delet-batch-result.component.html',
    styleUrl: './delet-batch-result.component.css'
})
export class DeletBatchResultComponent {

  batchResultId: string | null = null;
  batchResult: BatchResultResponseDto | null = null; // Replace with your course type

  batchResultService = inject(BatchResultService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.batchResultId = this.route.snapshot.paramMap.get('id');
    if (this.batchResultId) {
      this.batchResultService.getBatchResultById(this.batchResultId).subscribe({
        next: (res) => {
          this.batchResult = res.data;
        },
        error: (error) => {
          console.error('Error fetching result:', error);
          alert('Could not fetch result details.');
        }
      });
    }
  }

  confirmDelete(): void {
    if (this.batchResultId) {
      if (confirm(`Are you sure you want to delete the batch result for : ${this.batchResult?.examTitle}?`)) {
        this.batchResultService.deleteBatchResult(this.batchResultId).subscribe({
          next: () => {
            alert('Batch Result deleted successfully!');
            this.router.navigate(['/batchResults']);
          },
          error: (error) => {
            alert('An error occurred while deleting the result.');
            console.error('Delete error:', error);
          },
        });
      }
    }
  }

  cancelDelete(): void {
    this.router.navigate(['/batchResults']); 
  }
}
