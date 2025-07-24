import { Component, inject } from '@angular/core';
import { ApplicationResponseModel } from '../../../models/classes/application';
import { ApplicationServiceService } from '../../../services/application_service/application-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth_service/auth.service';

@Component({
  selector: 'app-delete-application',
  imports: [CommonModule],
  templateUrl: './delete-application.component.html',
  styleUrl: './delete-application.component.css'
})
export class DeleteApplicationComponent {

  applicationId: string | null = null;
  application: ApplicationResponseModel | null = null; // Replace with your course type

  applicationService = inject(ApplicationServiceService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  applicationStatusMap: { [key: number]: string } = {
    1: 'Pending',
    2: 'Accepted',
    3: 'Rejected',
  };

  isAdmin: boolean = false;
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";

  ngOnInit(): void {

    this.checkUserRole();

    this.applicationId = this.route.snapshot.paramMap.get('id');

    // Fetch the course details using the course ID
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

  confirmDelete(): void {
    if (this.applicationId) {
      if (confirm(`Are you sure you want to delete ${this.application?.applicantFullName} application?`)) {
        this.applicationService.deleteApplicationById(this.applicationId).subscribe({
          next: () => {
            alert('Application deleted successfully!');
            if(this.isAdmin){
              this.router.navigate(['/applications']);
            }
            this.router.navigate(['/applications-user'])
          },
          error: (error) => {
            alert('An error occurred while deleting the application.');
            console.error('Delete error:', error);
          },
        });
      }
    }
  }

  cancelDelete(): void {
    if(this.isAdmin){
      this.router.navigate(['/applications']);
    }
    this.router.navigate(['/applications-user']) // Navigate back to the applications list
  }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }

}
