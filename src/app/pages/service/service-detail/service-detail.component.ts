import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingServiceService } from '../../../services/training_service/training-service.service';
import { ExaminationService } from '../../../services/examination_service/examination.service';
import { PaymentType, PaymentTypeLabelMap } from '../../../models/enums/paymentType';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { TrainingResponseModel } from '../../../models/classes/training';
import { ExaminationResponseModel } from '../../../models/classes/examination';

@Component({
  selector: 'app-service-detail',
  imports: [CommonModule],
  templateUrl: './service-detail.component.html',
  styleUrl: './service-detail.component.css'
})
export class ServiceDetailComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private traningService: TrainingServiceService,
    private examinationService: ExaminationService,
    private notifier: NotificationService
  ) { }

  serviceId: string | null = null;
  isTraining: boolean = false;
  paymentType: string | null = null;
  token: string | null = null;
  training!: TrainingResponseModel;
  exam!: ExaminationResponseModel;

  isLoading: boolean = true;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    this.paymentType = this.route.snapshot.queryParamMap.get('paymentType');
    this.token = this.route.snapshot.queryParamMap.get('token');

    if (!this.serviceId || !this.paymentType) {
      this.errorMessage = 'Missing service ID or payment type.';
      this.isLoading = false;
      return;
    }

    console.log(this.serviceId)
    console.log(this.paymentType)
    console.log(this.token)


    localStorage.setItem('userToken', this.token!);

    if (this.paymentType === 'Training') {
      this.isTraining = true;
      this.getTrainingById(this.serviceId);
    } else if (this.paymentType === 'Examination') {
      this.isTraining = false;
      this.getExamById(this.serviceId);
    } else {
      this.errorMessage = 'Invalid payment type.';
      this.isLoading = false;
    }
  }
 getExamById(id: string){
     this.examinationService.getExaminationById(id).subscribe((response: apiResponse) =>{
       if(response.isSuccessful){
           this.exam = response.data
       }
     })
   }

  getTrainingById(id: string) {
    this.isLoading = true;
    this.traningService.getTraininById(id).subscribe({
      next: (response: apiResponse) => {
        if (response.isSuccessful) {
          this.training = response.data;
        } else {
          this.errorMessage = 'Failed to load training details.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'An error occurred while fetching training data.';
        this.isLoading = false;
      }
    });
  }

  onPayNow() {
    if (this.serviceId) {
      this.router.navigate(['/payments/initiate', this.serviceId], {
        queryParams: { paymentType: this.paymentType }
      });
    } else {
      this.notifier.show('Service ID is missing. Cannot proceed to payment.');
    }
  }

  onCancel() {
    this.router.navigateByUrl('/sign-in');
  }
}
