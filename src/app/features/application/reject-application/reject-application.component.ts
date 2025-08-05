import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ApplicationServiceService } from '../../../core/services/application/application-service.service';
import { ApplicationRejectionModel } from '../../../shared/models/interfaces/applicationRejection';
import { ApplicationResponseModel } from '../../../shared/models/classes/application';


@Component({
    selector: 'app-reject-application',
    imports: [FormsModule],
    templateUrl: './reject-application.component.html',
    styleUrl: './reject-application.component.css'
})
export class RejectApplicationComponent {

  applicationId: string | null = null;
  applicationService = inject(ApplicationServiceService);
  router = inject(Router);
  route = inject(ActivatedRoute);
  application: ApplicationResponseModel | null = null;

  reasonForRejection: ApplicationRejectionModel = {
    rejectionReason: ''
  };

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('id');

    if (this.applicationId) {
      this.applicationService.getApplicationById(this.applicationId).subscribe({
        next: (res) => {
          this.application = res.data; // Assuming your API returns the app details
        },
        error: (error) => {
          console.error('Error fetching application:', error);
          alert('Could not fetch application details.');
        }
      });
    }
  }

  
  confirmRejection(): void {
    if (this.applicationId) {
      if (confirm(`Are you sure you want to reject ${this.application?.applicantFullName} application?`)) {
        this.applicationService.rejectApplication(this.applicationId, this.reasonForRejection).subscribe({
          next: () => {
            alert('Application rejection successfully!');
            this.router.navigate(['/applications']);
          },
          error: (error) => {
            alert('An error occurred while rejecting the application.');
            console.error('Delete error:', error);
          },
        });
      }
    }
  }

  cancelRejection(): void {
    this.router.navigate(['/applications']); // Navigate back to the applications list
  }

}