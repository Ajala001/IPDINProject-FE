import { Component, inject, OnInit } from '@angular/core';
import { ApplicationServiceService } from '../../../services/application_service/application-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationModel } from '../../../models/classes/application';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-create-application',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './create-application.component.html',
  styleUrl: './create-application.component.css'
})
export class CreateApplicationComponent implements OnInit {
  applicationId: string = '';
  applicationType: string = '';
  submissionInProgress: boolean = false; // Track submission progress
  submissionSuccess: boolean = false;     // Track successful submission
  submissionError: boolean = false;       // Track submission error
  apiMessage: string = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ApplicationServiceService
  ) {}

  ngOnInit() {
    // Get the query parameters
    this.route.queryParams.subscribe(params => {
      this.applicationId = params['applicationId'];
      this.applicationType = params['reason'];
    });

    // Automatically submit the application after retrieving the parameters
    this.onSubmit();
  }
  
  onSubmit() {
    this.submissionInProgress = true; // Set to true when starting submission
    const applicationModel = {
      applicationId: this.applicationId,
      applicationType: this.applicationType,
    };

    this.applicationService.createApplication(applicationModel).subscribe({
      next: (response) => {
          this.submissionInProgress = false; // Reset progress state
          console.log('API response:', response); // Log response for debugging
  
          if (response.isSuccessful) {
              this.submissionSuccess = true; // Set success state
              this.apiMessage = 'Application submitted successfully!'; // Set a success message
          } else {
              this.submissionError = true; // Set error state
              this.apiMessage = response.message || 'An unknown error occurred.'; // Use a default message if none exists
          }
      },
      error: (err: HttpErrorResponse) => {
          this.submissionInProgress = false; // Reset progress state
          this.submissionError = true; // Set error state
          
          // Check if the error response contains the expected message structure
          if (err.error && err.error.message) {
              this.apiMessage = err.error.message; // Display the error message from the API response
          } else {
              this.apiMessage = 'You already have a pending application, hence you can not apply for this same again.'; // Generic error message
          }
  
          console.error('Error occurred:', err); // Log the error for debugging
      }
  });
}
} 
