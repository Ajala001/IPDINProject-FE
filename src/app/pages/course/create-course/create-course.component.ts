import { Component, inject } from '@angular/core';
import { CourseServiceService } from '../../../services/course_service/course-service.service';
import { CourseModel } from '../../../models/classes/course';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-create-course',
    imports: [FormsModule, CommonModule],
    templateUrl: './create-course.component.html',
    styleUrl: './create-course.component.css'
})
export class CreateCourseComponent {

  courseService = inject(CourseServiceService)
  router = inject(Router)
  courseObj: CourseModel = new CourseModel();

  courseStatus = [
    { id: 1, label: 'Active' },
    { id: 2, label: 'Inactive' },
    { id: 3, label: 'Upcoming' },
    { id: 4, label: 'Completed' },
    { id: 5, label: 'Cancelled' }
  ];
   
  createCourse() {
    debugger;
    this.courseObj.status = Number(this.courseObj.status);
    this.courseService.createCourse(this.courseObj).subscribe((response: apiResponse) => {
      if (response.isSuccessful) {
        alert(response.message)
        this.router.navigateByUrl("courses");
      } else {
        alert(response.message)
        this.router.navigateByUrl("dashboard")
      }
    })
  }
}
