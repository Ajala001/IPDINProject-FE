import { Component, inject } from '@angular/core';
import { TrainingResponseModel } from '../../../models/classes/training';
import { TrainingServiceService } from '../../../services/training_service/training-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-training',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './delete-training.component.html',
  styleUrl: './delete-training.component.css'
})
export class DeleteTrainingComponent {
  trainingId: string | null = null;
  training: TrainingResponseModel | null = null; // Replace with your course type

  trainingService = inject(TrainingServiceService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.trainingId = this.route.snapshot.paramMap.get('id');

    // Fetch the course details using the course ID
    if (this.trainingId) {
      this.trainingService.getTraininById(this.trainingId).subscribe({
        next: (res) => {
          this.training = res.data; // Assuming your API returns the course details
        },
        error: (error) => {
          console.error('Error fetching training:', error);
          alert('Could not fetch training details.');
        }
      });
    }
  }

  confirmDelete(): void {
    if (this.trainingId) {
      if (confirm(`Are you sure you want to delete the training: ${this.training?.title}?`)) {
        this.trainingService.deleteTraining(this.trainingId).subscribe({
          next: () => {
            alert('Training deleted successfully!');
            this.router.navigate(['/trainings']);
          },
          error: (error) => {
            alert('An error occurred while deleting the training.');
            console.error('Delete error:', error);
          },
        });
      }
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

  cancelDelete(): void {
    this.router.navigate(['/trainings']); // Navigate back to the examination list
  }
}
