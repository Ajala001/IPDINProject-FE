import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth_service/auth.service';
import { RouterLink } from '@angular/router';
import { SignUpModel } from '../../models/classes/SignUp';
import { CommonModule } from '@angular/common';
import { AcademicQualificationModel } from '../../models/classes/academicQualification';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { FormsModule } from '@angular/forms';
import { RegistrationTypeService } from '../../services/registrationType_service/registration-type.service';
import { RegistrationTypeResponse } from '../../models/classes/registrationType';




@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [FormsModule, RouterLink, CommonModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {

  stepsList: any[] = [
    { stepName: "Basic Details", isComplete: false },
    { stepName: "Driver Details", isComplete: false },
    { stepName: "Qualification", isComplete: false },
  ];

  activeStep: any = this.stepsList[0];

  setActiveStep(step: any) {
    this.activeStep = step;
  }

  authService = inject(AuthService)
  registrationTypeService = inject(RegistrationTypeService)
  signUpObj: SignUpModel = new SignUpModel();
  qualificationObj: AcademicQualificationModel = new AcademicQualificationModel();


  genderOptions = [
    { id: 1, label: 'Male' },
    { id: 2, label: 'Female' },
    { id: 3, label: 'Other' }
  ];

  years: number[] = [];
  registarationTypes: RegistrationTypeResponse[] = []


  ngOnInit(): void {
    // Generate a list of years from 1900 to the current year
    const currentYear = new Date().getFullYear();
    for (let year = 1900; year <= currentYear; year++) {
      this.years.push(year);
    }

    this.getAllRegistrationTypes();
  }

  stepperCompletionValue: number = 11;

  gotoStep2() {
    const currentStep = this.stepsList.find(n => n.stepName == this.activeStep.stepName)
    currentStep.isComplete = true;
    this.activeStep = this.stepsList[1]
    this.stepperCompletionValue = 51
  }

  gotoStep3() {
    const currentStep = this.stepsList.find(n => n.stepName == this.activeStep.stepName)
    currentStep.isComplete = true;
    this.activeStep = this.stepsList[2]
    this.stepperCompletionValue = 101
  }

  showPassword1: boolean = false;
  showPassword2: boolean = false;

  isComplete: boolean = false;

  togglePasswordVisibility1() {
    this.showPassword1 = !this.showPassword1;
  }

  togglePasswordVisibility2() {
    this.showPassword2 = !this.showPassword2;
  }

  signUp() {
    debugger;
    if (this.signUpObj.academicQualifications.length === 0) {
      alert('Please add at least one qualification.');
      return;
    }
    this.signUpObj.gender = Number(this.signUpObj.gender);
    this.authService.signUp(this.signUpObj).subscribe((response: apiResponse) => {
      if (response.isSuccessful) {
        alert(response.message)
        console.log('User registered successfully:', response);
        console.log('Form Submitted:', this.signUpObj);
      } else {
        alert(response.message)
      }
    })
  }


  addQualification() {
    // Add an empty qualification object to the list
    this.signUpObj.academicQualifications.push({
      degree: '',
      fieldOfStudy: '',
      institution: '',
      yearAttained: 0
    });
    console.log(this.signUpObj);
  }

  saveQualification(index: number) {
    const qualification = this.signUpObj.academicQualifications[index];
    if (
      qualification.degree &&
      qualification.fieldOfStudy &&
      qualification.institution &&
      qualification.yearAttained
    ) {
      console.log('Qualification Saved:', qualification);
    } else {
      alert('Please fill out all fields before saving.');
    }
  }

  deleteQualification(index: number) {
    // Remove qualification from the list
    this.signUpObj.academicQualifications.splice(index, 1);
  }


getAllRegistrationTypes(){
  this.registrationTypeService.getRegistrationTypes().subscribe((res: apiResponse)=>{
    if (res.isSuccessful) {
      alert(res.message)
      this.registarationTypes = res.data
    }else
    {
      alert(res.message)
    }
  });
}



}
