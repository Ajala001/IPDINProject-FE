import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrainingServiceService } from '../../../core/services/training/training-service.service';
import { TrainingResponseModel, TrainingUpdateModel } from '../../../shared/models/classes/training';

@Component({
    selector: 'app-edit-training',
    imports: [FormsModule, CommonModule],
    templateUrl: './edit-training.component.html',
    styleUrl: './edit-training.component.css'
})
export class EditTrainingComponent {
  route = inject(ActivatedRoute);
  trainingService = inject(TrainingServiceService);
  router = inject(Router);
  trainingId: string | null = null;

  training: TrainingResponseModel = {
    id: '',         
    title: '',
    description: '',  
    fee: '',   
    startingDateAndTime: '',   
    endingDateAndTime: '',
    registrationDeadline: '',
    duration: 0,  
    capacity: 0,
    category: 0,   
    status: 0
  }

  trainingUpdateModel: TrainingUpdateModel = {        
    title: '',
    description: '', 
    fee: 0,  
    startingDateAndTime: '',   
    endingDateAndTime: '',
    registrationDeadline: '',
    duration: 0,
    capacity: 0,
    category: 1,    
    status: 1
  };

  trainingStatus = [
    { id: 1, label: 'Scheduled' },
    { id: 2, label: 'Upcoming' },
    { id: 3, label: 'Ongoing' },
    { id: 4, label: 'Completed' },
    { id: 5, label: 'Cancelled' }
  ];

  trainingCategory = [
    { id: 1, label: 'Technician' },
    { id: 2, label: 'Affliate' },
    { id: 3, label: 'Fellow' },
    { id: 4, label: 'Honorary' }
  ];
   

  ngOnInit(): void {
    // Get the course ID from the route parameters
    this.trainingId = this.route.snapshot.paramMap.get('id');

    // Fetch the course details using the training ID
    if (this.trainingId) {
      this.trainingService.getTraininById(this.trainingId).subscribe({
        next: (response) => {
          this.training = response.data;
          this.trainingUpdateModel = {
            title: this.training.title,
            description: this.training.description,
            fee: 0,  
            startingDateAndTime: this.training.startingDateAndTime,
            endingDateAndTime: this.training.endingDateAndTime,
            registrationDeadline: this.training.registrationDeadline,
            duration: this.training.duration,
            capacity: this.training.capacity,
            category: this.training.category,
            status: this.training.status
          };
        },
        error: (error) => {
          console.error('Error fetching training:', error);
          alert('Could not fetch training details.');
        }
      });
    }
  }

  updatTraining(): void {
    if (this.trainingId && this.training) {
      console.log(this.training)
      if (confirm(`Are you sure you want to update the training: ${this.training.title}?`)) {
        this.trainingUpdateModel.status = Number(this.trainingUpdateModel.status);
        this.trainingUpdateModel.category = Number(this.trainingUpdateModel.category);
        this.trainingUpdateModel.fee = Number(this.training.fee);
        this.trainingService.updatetrainingByid(this.trainingId, this.trainingUpdateModel).subscribe({
          next: () => {
            alert('Training updated successfully!');
            this.router.navigate(['/trainings']);
          },
          error: (error) => {
            alert('An error occurred while updating the training.');
            console.error('Update error:', error);
          },
        });
      }
    }
  }
}
