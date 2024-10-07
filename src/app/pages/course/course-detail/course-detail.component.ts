import { Component, inject } from '@angular/core';
import { CourseServiceService } from '../../../services/course_service/course-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseResponseModel } from '../../../models/classes/course';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.component.html',
  styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {

  constructor(private route: ActivatedRoute) {}

  courseService = inject(CourseServiceService)
  router = inject(Router)
  courseId: string | null = null;
  course!: CourseResponseModel
 


  courseStatusMap: { [key: number]: string } = {
    1: 'Active',
    2: 'Inactive',
    3: 'Upcoming',
    4: 'Completed',
    5: 'Cancelled'
  };

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.getCourseById(this.courseId!);
  }

  getCourseById(id: string){
    this.courseService.getCourseById(id).subscribe((response: apiResponse) =>{
      if(response.isSuccessful){
          this.course = response.data
      }
    })
  }
}
