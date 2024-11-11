import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ExaminationService } from '../../../services/examination_service/examination.service';
import { ExaminationResponseModel } from '../../../models/classes/examination';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth_service/auth.service';

@Component({
  selector: 'app-examination-detail',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './examination-detail.component.html',
  styleUrl: './examination-detail.component.css'
})
export class ExaminationDetailComponent {

  constructor(private route: ActivatedRoute) {
    this.checkUserRole();
  }

  examinationService = inject(ExaminationService)
  router = inject(Router)
  examId: string | null = null;
  exam!: ExaminationResponseModel
 
  isAdmin: boolean = false;
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";

  ngOnInit(): void {
    this.examId = this.route.snapshot.paramMap.get('id');
    this.getExamById(this.examId!);
  }

  getExamById(id: string){
    this.examinationService.getExaminationById(id).subscribe((response: apiResponse) =>{
      if(response.isSuccessful){
          this.exam = response.data
      }
    })
  }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
}
