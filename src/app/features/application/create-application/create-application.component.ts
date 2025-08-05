import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationResponseModel } from '../../../shared/models/classes/application';
import { ExaminationResponseModel } from '../../../shared/models/classes/examination';
import { ApplicationServiceService } from '../../../core/services/application/application-service.service';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';

@Component({
  selector: 'app-create-application',
  imports: [CommonModule],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.css'
})
export class CreateApplicationComponent implements OnInit {
  serviceId: string | null = null;
  isTraining: boolean = false;
  submissionInProgress: boolean = false; // Track submission progress
  submissionSuccess: boolean = false;     // Track successful submission
  submissionError: boolean = false;       // Track submission error
  apiMessage: string = '';
  applicationDetail: ApplicationResponseModel | undefined;
  exam: ExaminationResponseModel | undefined; // Define the appropriate type for your `exam` object
  paymentType: string | null = null;

  applicationModel: { serviceId: string; isTraining: boolean } = {
    serviceId: '',
    isTraining: false,
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationServiceService
  ) { }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    console.log('ID:', this.serviceId);


    this.paymentType = this.route.snapshot.queryParamMap.get('paymentType');
    if (this.paymentType === 'Training') {
      this.isTraining = true;
    }
    console.log('Is Training:', this.isTraining);
    debugger;

    this.applicationModel = {
      serviceId: this.serviceId ?? '',
      isTraining: this.isTraining,
    };

    this.CreateApplication();
  }


  CreateApplication(): void {
    this.submissionInProgress = true; 
    this.applicationService.createApplication(this.applicationModel).subscribe({
      next: (response: apiResponse) => {
        if (response.isSuccessful) {
          this.applicationDetail = response.data; 
          debugger;
          console.log('Application submitted successfully:', this.applicationDetail);
          this.router.navigate(['/payments/initiate', this.applicationDetail?.id], { queryParams: { paymentType: 'Application' } });
        } else {
          console.error('Application submission failed:', response.message);
        }
      },
      error: (error) => {
        console.error('An error occurred during application submission:', error);
      },
      complete: () => {
        this.submissionInProgress = false; // Reset the flag when the request is complete
      }
    });
  }
  

}
