import { Component, inject } from '@angular/core';
import { CourseServiceService } from '../../../services/course_service/course-service.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CourseResponseModel } from '../../../models/classes/course';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-course',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './delete-course.component.html',
  styleUrl: './delete-course.component.css'
})
export class DeleteCourseComponent {
  courseId: string | null = null;
  course: CourseResponseModel | null = null; // Replace with your course type

  courseService = inject(CourseServiceService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  courseStatusMap: { [key: number]: string } = {
    1: 'Active',
    2: 'Inactive',
    3: 'Upcoming',
    4: 'Completed',
    5: 'Cancelled'
  };

  ngOnInit(): void {
    // Get the course ID from the route parameters
    this.courseId = this.route.snapshot.paramMap.get('id');

    // Fetch the course details using the course ID
    if (this.courseId) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (course) => {
          this.course = course.data; // Assuming your API returns the course details
        },
        error: (error) => {
          console.error('Error fetching course:', error);
          alert('Could not fetch course details.');
        }
      });
    }
  }

  confirmDelete(): void {
    if (this.courseId) {
      if (confirm(`Are you sure you want to delete the course: ${this.course?.courseTitle}?`)) {
        this.courseService.deleteCourseById(this.courseId).subscribe({
          next: () => {
            alert('Course deleted successfully!');
            this.router.navigate(['/courses']);
          },
          error: (error) => {
            alert('An error occurred while deleting the course.');
            console.error('Delete error:', error);
          },
        });
      }
    }
  }

  cancelDelete(): void {
    this.router.navigate(['/courses']); // Navigate back to the courses list
  }
}
