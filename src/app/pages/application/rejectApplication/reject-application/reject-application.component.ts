import { Component, inject } from '@angular/core';
import { ApplicationServiceService } from '../../../../services/application_service/application-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationResponseModel } from '../../../../models/classes/application';
import { ApplicationRejectionModel } from '../../../../models/interfaces/applicationRejection';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-reject-application',
  standalone: true,
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
      if (confirm(`Are you sure you want to reject ${this.application?.applicantfullName} application?`)) {
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
