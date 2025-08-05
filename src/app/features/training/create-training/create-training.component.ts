import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TrainingServiceService } from '../../../core/services/training/training-service.service';
import { TrainingModel } from '../../../shared/models/classes/training';
import { Router } from '@angular/router';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';

@Component({
    selector: 'app-create-training',
    imports: [FormsModule, CommonModule],
    templateUrl: './create-training.component.html',
    styleUrl: './create-training.component.css'
})
export class CreateTrainingComponent {

  trainingService = inject(TrainingServiceService)
  router = inject(Router)
  trainingObj: TrainingModel = new TrainingModel();
  // toastr = inject(ToastrService)

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
   
  createTraining() {
    debugger;
    this.trainingObj.status = Number(this.trainingObj.status);
    this.trainingObj.category = Number(this.trainingObj.category);
    this.trainingService.createTraining(this.trainingObj).subscribe((response: apiResponse) => {
      if (response.isSuccessful) {
        alert(response.message)
        this.router.navigateByUrl("trainings");
      } else {
        alert(response.message)
        this.router.navigateByUrl("dashboard")
      }
    })
  }

  // validateDates(): boolean {
  //   const startingDate = new Date(this.trainingObj.startingDateAndTime);
  //   const endingDate = new Date(this.trainingObj.endingDateAndTime);
  //   const registrationDeadline = new Date(this.trainingObj.registrationDeadline);

  //   if (startingDate >= endingDate) {
  //     this.toastr.error('Starting Date and Time must be before Ending Date and Time');
  //     return false;
  //   }

  //   if (registrationDeadline >= startingDate) {
  //     this.toastr.error('Registration Deadline must be before Starting Date and Time');
  //     return false;
  //   }

  //   return true;
  // }
}