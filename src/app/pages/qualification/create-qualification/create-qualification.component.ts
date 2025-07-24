import { Component, inject, OnInit } from '@angular/core';
import { QualificationService } from '../../../services/qualification_service/qualification.service';
import { AcademicQualificationModel } from '../../../models/classes/academicQualification';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-create-qualification',
    imports: [FormsModule, CommonModule, RouterModule],
    templateUrl: './create-qualification.component.html',
    styleUrl: './create-qualification.component.css'
})
export class CreateQualificationComponent implements OnInit{

  userEmail: string = '';
  route = inject(ActivatedRoute)

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = 1900; year <= currentYear; year++) {
      this.years.push(year);
    }


    this.route.paramMap.subscribe(params => {
      this.userEmail = params.get('email') || '';
      console.log('Retrieved email:', this.userEmail);
    });
  }

  qualificationService = inject(QualificationService);
  qualificationObj: AcademicQualificationModel = new AcademicQualificationModel
  years: number[] = [];
  router = inject(Router)

  addQualification(email: string) {
    debugger; // This can be used for debugging purposes
    console.log(this.qualificationObj); // Log the qualification object to verify it's correct
    debugger;
    this.qualificationService.createQualification(this.qualificationObj).subscribe({
      next: (response: apiResponse) => { // 'next' handles successful responses
        if (response.isSuccessful) {
          alert(response.message); // Alert on successful qualification addition
          this.router.navigateByUrl(`users/${email}/detail`); // Navigate to the user's detail page
        } else {
          alert(response.message); // Alert on failure
        }
      },
      error: (error) => { // 'error' handles any errors
        console.error('Error adding qualification:', error); // Log any errors
        alert('An error occurred while adding the qualification.'); // Notify the user of an error
      },
      complete: () => {
        console.log('Qualification addition process complete.'); // Optional 'complete' handler if needed
      }
    });
  }  

  backToUserDetail(email: string){
    console.log("Navigating to user detail for:", email); 
    this.router.navigateByUrl(`users/${email}/detail`);
  }

}
