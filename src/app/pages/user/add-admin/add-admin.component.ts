import { Component, inject } from '@angular/core';
import { LevelService } from '../../../services/level_service/level.service';
import { AddAdminModel } from '../../../models/classes/admin';
import { AcademicQualificationModel } from '../../../models/classes/academicQualification';
import { LevelResponseModel } from '../../../models/classes/level';
import { UserService } from '../../../services/user_service/user.service';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-admin',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-admin.component.html',
  styleUrl: './add-admin.component.css'
})
export class AddAdminComponent {

  stepsList: any[] = [
    { stepName: "Basic Details", isComplete: false },
    { stepName: "Driver Details", isComplete: false },
    { stepName: "Qualification", isComplete: false },
  ];

  activeStep: any = this.stepsList[0];

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