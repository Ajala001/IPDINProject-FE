import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";
import { AuthService } from "../../../core/services/auth/auth.service";
import { LevelService } from "../../../core/services/level/level.service";
import { SignUpModel } from "../../../shared/models/classes/SignUp";
import { AcademicQualificationModel } from "../../../shared/models/classes/academicQualification";
import { apiResponse } from "../../../shared/models/interfaces/apiResponse";
import { LevelResponseModel } from "../../../shared/models/classes/level";
import { HomeNavbarComponent } from "../../home-navbar/home-navbar.component";
import { NotificationService } from "../../../shared/services/notification/notification.service";


@Component({
    selector: 'app-sign-up',
    imports: [FormsModule, CommonModule, RouterModule, HomeNavbarComponent],
    templateUrl: './sign-up.component.html',
    styleUrl: './sign-up.component.css'
})
export class SignUpComponent implements OnInit {
  activeLink: string = 'sign-up'; // Default active link
    currentStep: number = 1;
  
    setActive(link: string): void {
      console.log('Setting active link to:', link);
      this.activeLink = link;
    }
  
    isActive(link: string): boolean {
      return this.activeLink === link;
    }
  
    stepsList: any[] = [
      { stepName: "Basic Details", isComplete: false },
      { stepName: "Driver Details", isComplete: false },
      { stepName: "Qualification", isComplete: false },
      { stepName: "Completion", isComplete: false }
    ];
  
    activeStep: any = this.stepsList[0];
    stepperCompletionValue: number = 11;
  
    showIntro: boolean = true;
    showPassword1: boolean = false;
    showPassword2: boolean = false;
  
    isComplete: boolean = false;
  
    authService = inject(AuthService);
    levelService = inject(LevelService);
    notifier = inject(NotificationService);
    router = inject(Router);
  
    signUpObj: SignUpModel = new SignUpModel();
    qualificationObj: AcademicQualificationModel = new AcademicQualificationModel();
    levels: LevelResponseModel[] = [];
    genderOptions = [
      { id: 1, label: 'Male' },
      { id: 2, label: 'Female' },
      { id: 3, label: 'Other' }
    ];
  
    years: number[] = [];
  
    ngOnInit(): void {
      const currentYear = new Date().getFullYear();
      for (let year = 1900; year <= currentYear; year++) {
        this.years.push(year);
      }
      this.getLevels();
    }
  
    nextStep(form?: NgForm) {
    if (form && !form.valid) {
      form.control.markAllAsTouched();
      return;
    }
  
    this.currentStep++;
  }
  
  
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
        this.activeStep = this.stepsList[this.currentStep - 1];
        this.updateCompletionValue();
      }
    }
  
    updateCompletionValue() {
      switch (this.currentStep) {
        case 1:
          this.stepperCompletionValue = 11;
          break;
        case 2:
          this.stepperCompletionValue = 51;
          break;
        case 3:
          this.stepperCompletionValue = 76;
          break;
        case 4:
          this.stepperCompletionValue = 101;
          break;
      }
    }
  
    setActiveStep(step: any) {
      this.activeStep = step;
    }
  
    togglePasswordVisibility1() {
      this.showPassword1 = !this.showPassword1;
    }
  
    togglePasswordVisibility2() {
      this.showPassword2 = !this.showPassword2;
    }
  
    addQualification() {
      this.signUpObj.academicQualifications.push(new AcademicQualificationModel());
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
  
    removeQualification(index: number) {
      this.signUpObj.academicQualifications.splice(index, 1);
    }
  
    submitRegistration() {
      if (this.signUpObj.academicQualifications.length === 0) {
        this.notifier.show('Please add at least one qualification.', 'warning');
        return;
      }
  
      this.signUpObj.gender = Number(this.signUpObj.gender);
  
      console.log('Submitting:', this.signUpObj);
  
      this.authService.signUp(this.signUpObj).subscribe((response: apiResponse) => {
        if (response.isSuccessful) {
          this.notifier.show(response.message);
          this.router.navigate(['/auth/sign-in'], { 
          queryParams: { returnUrl: '/payments/initiate' } 
        });
        } else {
          this.notifier.show(response.message, 'error');
        }
      });
    }
  
    getLevels() {
      this.levelService.getLevels().subscribe((res: apiResponse) => {
        if (res.isSuccessful) {
          this.levels = res.data;
        } else {
          alert(res.message);
        }
      });
    }
  
  }
  
  