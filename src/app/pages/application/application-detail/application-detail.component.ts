import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApplicationServiceService } from '../../../services/application_service/application-service.service';
import { ApplicationResponseModel } from '../../../models/classes/application';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-application-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './application-detail.component.html',
  styleUrl: './application-detail.component.css'
})
export class ApplicationDetailComponent {

  constructor(private route: ActivatedRoute) {}

  applicationService = inject(ApplicationServiceService)
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
}
