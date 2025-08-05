import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';;
import { CommonModule } from '@angular/common';
import { CourseServiceService } from '../../../core/services/course/course-service.service';
import { CourseResponseModel } from '../../../shared/models/classes/course';
import { AuthService } from '../../../core/services/auth/auth.service';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';

@Component({
    selector: 'app-course-detail',
    imports: [CommonModule, RouterModule],
    templateUrl: './course-detail.component.html',
    styleUrl: './course-detail.component.css'
})
export class CourseDetailComponent {

  constructor(private route: ActivatedRoute) {
    this.checkUserRole();
  }

  courseService = inject(CourseServiceService)
  router = inject(Router)
  courseId: string | null = null;
  course!: CourseResponseModel
 
  isAdmin: boolean = false;
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";


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

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
}
