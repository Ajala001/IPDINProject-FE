import { Component, inject, OnInit } from '@angular/core';
import { ExaminationService } from '../../../services/examination_service/examination.service';
import { Router } from '@angular/router';
import { ExaminationModel } from '../../../models/classes/examination';
import { CourseResponseModel, CourseResponseModel2 } from '../../../models/classes/course';
import { CourseServiceService } from '../../../services/course_service/course-service.service';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-examination',
    imports: [FormsModule, CommonModule],
    templateUrl: './create-examination.component.html',
    styleUrl: './create-examination.component.css'
})
export class CreateExaminationComponent implements OnInit{
Math: any;

  ngOnInit(){
    this.getCourses();

    const currentYear = new Date().getFullYear();
    for (let year = 1900; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  examService = inject(ExaminationService)
  courseService = inject(CourseServiceService)
  router = inject(Router)
  examObj: ExaminationModel = new ExaminationModel
  courses: CourseResponseModel2[] = []
  pageSize: number = 0;  // Default page size
  pageNumber: number = 0; // Default page number
  years: number[] = [];
  
   
  createExam() {
    debugger;
    this.examService.createExamination(this.examObj).subscribe((response: apiResponse) => {
      if (response.isSuccessful) {
        alert(response.message)
        this.router.navigateByUrl("examinations");
      } else {
        alert(response.message)
        this.router.navigateByUrl("examinations/create")
      }
    })
  }

  onCourseChange(courseId: string, isChecked: boolean) {
    if (isChecked) {
      this.examObj.courses.push(courseId);  // Add course ID if checked
    } else {
      const index = this.examObj.courses.indexOf(courseId);
      if (index > -1) {
        this.examObj.courses.splice(index, 1);  // Remove course ID if unchecked
      }
    }
  }

  getCourses() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.courseService.getCourses(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        // Ensure selected is always initialized to a boolean
        this.courses = response.data.map((course: any) => {
          return {
            ...course,
            selected: false // Initialize selected property to false
          } as CourseResponseModel2; // Explicitly cast to the type
        });
      } else {
        alert(response.message);
      }
    });
  }
}
