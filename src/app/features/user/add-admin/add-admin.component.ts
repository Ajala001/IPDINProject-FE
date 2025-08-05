import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../core/services/user/user.service';
import { LevelService } from '../../../core/services/level/level.service';
import { AddAdminModel } from '../../../shared/models/classes/admin';
import { AcademicQualificationModel } from '../../../shared/models/classes/academicQualification';
import { LevelResponseModel } from '../../../shared/models/classes/level';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';

@Component({
    selector: 'app-add-admin',
    imports: [FormsModule, CommonModule, RouterLink],
    templateUrl: './add-admin.component.html',
    styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {
  activeLink: string = 'users/add-admin'; // Default active link

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
  ];

  activeStep: any = this.stepsList[0];
  basicDetailsFields: any;

  setActiveStep(step: any) {
    this.activeStep = step;
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

  gotoPreviousStep() {
    const currentIndex = this.stepsList.indexOf(this.activeStep);
    if (currentIndex > 0) {
      this.activeStep = this.stepsList[currentIndex - 1];
    }
  }


  userService = inject(UserService)
  levelService = inject(LevelService)
  addminUserObj: AddAdminModel = new AddAdminModel();
  qualificationObj: AcademicQualificationModel = new AcademicQualificationModel();


  genderOptions = [
    { id: 1, label: 'Male' },
    { id: 2, label: 'Female' },
    { id: 3, label: 'Other' }
  ];

  years: number[] = [];
  levels: LevelResponseModel[] = []


  ngOnInit(): void {
    // Generate a list of years from 1900 to the current year
    const currentYear = new Date().getFullYear();
    for (let year = 1900; year <= currentYear; year++) {
      this.years.push(year);
    }

    this.getLevels();
  }

  addAdmin() {
    debugger;
    if (this.addminUserObj.academicQualifications.length === 0) {
      alert('Please add at least one qualification.');
      return;
    }
    this.addminUserObj.gender = Number(this.addminUserObj.gender);
    console.log(this.addminUserObj);
    this.userService.addAdmin(this.addminUserObj).subscribe((response: apiResponse) => {
      if (response.isSuccessful) {
        alert(response.message)
        console.log('Admin added successfully:', response);
        console.log('Form Submitted:', this.addminUserObj);
      } else {
        alert(response.message)
      }
    })
  }


  addQualification() {
    // Add an empty qualification object to the list
    this.addminUserObj.academicQualifications.push({
      degree: '',
      fieldOfStudy: '',
      institution: '',
      yearAttained: 0
    });
    console.log(this.addminUserObj);
  }

  saveQualification(index: number) {
    const qualification = this.addminUserObj.academicQualifications[index];
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
    this.addminUserObj.academicQualifications.splice(index, 1);
  }


  getLevels() {
    this.levelService.getLevels().subscribe((res: apiResponse) => {
      if (res.isSuccessful) {
        alert(res.message)
        this.levels = res.data
      } else {
        alert(res.message)
      }
    });
  }
}