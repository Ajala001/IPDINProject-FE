import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseServiceService } from '../../../core/services/course/course-service.service';
import { CourseResponseModel } from '../../../shared/models/classes/course';

@Component({
    selector: 'app-edit-course',
    imports: [FormsModule, RouterModule, CommonModule],
    templateUrl: './edit-course.component.html',
    styleUrl: './edit-course.component.css'
})
export class EditCourseComponent implements OnInit {
  route = inject(ActivatedRoute);
  courseService = inject(CourseServiceService);
  router = inject(Router);
  courseId: string | null = null;

  course: CourseResponseModel = {
    id: '',
    courseTitle: '',
    courseCode: '',
    courseUnit: '',
    status: 1 // Set default status (or an appropriate default)
  };

  courseStatus = [
    { id: 1, label: 'Active' },
    { id: 2, label: 'Inactive' },
    { id: 3, label: 'Upcoming' },
    { id: 4, label: 'Completed' },
    { id: 5, label: 'Cancelled' }
  ];

  ngOnInit(): void {
    // Get the course ID from the route parameters
    this.courseId = this.route.snapshot.paramMap.get('id');

    // Fetch the course details using the course ID
    if (this.courseId) {
      this.courseService.getCourseById(this.courseId).subscribe({
        next: (response) => {
          this.course = response.data; // Assuming your API returns the course details
        },
        error: (error) => {
          console.error('Error fetching course:', error);
          alert('Could not fetch course details.');
        }
      });
    }
  }

  updateCourse(): void {
    if (this.courseId && this.course) {
      console.log(this.course)
      if (confirm(`Are you sure you want to update the course: ${this.course.courseTitle}?`)) {
        this.course.status = Number(this.course.status);
        this.courseService.updateCourseById(this.courseId, this.course).subscribe({
          next: () => {
            alert('Course updated successfully!');
            this.router.navigate(['/courses']);
          },
          error: (error) => {
            alert('An error occurred while updating the course.');
            console.error('Update error:', error);
          },
        });
      }
    }
  }
}