import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApplicationServiceService } from '../../../core/services/application/application-service.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ApplicationResponseModel } from '../../../shared/models/classes/application';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';

@Component({
    selector: 'app-application-detail',
    imports: [CommonModule, RouterLink],
    templateUrl: './application-detail.component.html',
    styleUrl: './application-detail.component.css'
})
export class ApplicationDetailComponent {
  constructor(private route: ActivatedRoute) {
    this.checkUserRole();
  }

  isAdmin: boolean = false;
  applicationService = inject(ApplicationServiceService)
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";
  
  router = inject(Router)
  applicationId: string | null = null;
  application!: ApplicationResponseModel
 

  ngOnInit(): void {
    this.applicationId = this.route.snapshot.paramMap.get('id');
    this.getApplicationById(this.applicationId!);
  }

  applicationStatusMap: { [key: number]: string } = {
    1: 'Pending',
    2: 'Accepted',
    3: 'Rejected',
  };

  getApplicationById(id: string){
    this.applicationService.getApplicationById(id).subscribe((response: apiResponse) =>{
      if(response.isSuccessful){
          this.application = response.data
      }
    })
  }

  acceptApplication(id: string){
    this.applicationService.acceptApplication(id).subscribe((response: apiResponse) =>{
      if(response.isSuccessful){
        alert(response.message)
        this.router.navigate(['/applications']);
      }
    })
  }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
}
