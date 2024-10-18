import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TrainingServiceService } from '../../../services/training_service/training-service.service';
import { TrainingResponseModel } from '../../../models/classes/training';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-training-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './training-detail.component.html',
  styleUrl: './training-detail.component.css'
})
export class TrainingDetailComponent {
  constructor(private route: ActivatedRoute) {}

  trainingService = inject(TrainingServiceService)
  router = inject(Router)
  trainingId: string | null = null;
  training!: TrainingResponseModel
 

  ngOnInit(): void {
    this.trainingId = this.route.snapshot.paramMap.get('id');
    this.getTrainingById(this.trainingId!);
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

  
  getTrainingById(id: string){
    this.trainingService.getTraininById(id).subscribe((response: apiResponse) =>{
      if(response.isSuccessful){
        console.log(response.data)
          this.training = response.data
      }
    })
  }
}
