import { Component, inject, OnInit } from '@angular/core';
import { CourseServiceService } from '../../../services/course_service/course-service.service';
import { CourseResponseModel } from '../../../models/classes/course';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { CourseSearchModel } from '../../../models/classes/courseSearch';

@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit {
  cousreService = inject(CourseServiceService);
  router = inject(Router);


  totalCourses: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: CourseResponseModel[] = [];
  isSearchMode: boolean = false;

  ngOnInit() {
    this.getCourses(); // Fetch the initial set of courses on component initialization
  }

  getCourses() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.cousreService.getCourses(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalCourses = response.totalRecords;
        this.router.navigateByUrl("courses");
      } else {
        alert(response.message);
        this.router.navigateByUrl("dashboard");
      }
    });
  }

  courseStatusMap: { [key: number]: string } = {
    1: 'Active',
    2: 'Inactive',
    3: 'Upcoming',
    4: 'Completed',
    5: 'Cancelled'
  };

  getStatusLabel(status: number): string {
    return this.courseStatusMap[status] || 'Unknown';
  }

  // Adjust page size and decide whether to search or get all courses
  onPageSizeChange() {
    this.pageNumber = 1; // Reset to the first page when page size changes

    // Check if the search query exists; if it does, search. If not, get all courses
    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.searchCourses();  // Search if there is a search query
    } else {
      this.getCourses();     // Otherwise, fetch all courses
    }
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalCourses) { 
      this.pageNumber++;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchCourses();  // Fetch search results if in search mode
      } else {
        this.getCourses();     // Otherwise, fetch all courses
      }
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchCourses();  // Fetch search results if in search mode
      } else {
        this.getCourses();     // Otherwise, fetch all courses
      }
    }
  }



  params: CourseSearchModel = new CourseSearchModel
  searchCourses() {
    this.params.pageNumber = this.pageNumber;
    this.params.pageSize = this.pageSize;

    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.cousreService.searchCourses(this.params).subscribe((response: pagedResponse) => {
        if (response.isSuccessful) {
          this.paginatedData = response.data;
          this.totalCourses = response.totalRecords;
        } else {
          alert(response.message);
          this.router.navigateByUrl("dashboard"); // Navigate to dashboard on error
        }
      });
    } else {
      // If search query is empty, fetch all courses
      this.getCourses();
    }
  }
}


