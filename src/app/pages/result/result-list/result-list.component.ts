import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ResultServiceService } from '../../../services/result_service/result-service.service';
import { AuthService } from '../../../services/auth_service/auth.service';
import { StudentResultResponseDto } from '../../../models/interfaces/resultResponse';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { SearchQueryModel } from '../../../models/classes/searchQuery';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-result-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './result-list.component.html',
  styleUrl: './result-list.component.css'
})
export class ResultListComponent {
  resultService = inject(ResultServiceService);
  route = inject(ActivatedRoute);
  router = inject(Router);

  isAdmin: boolean = false;
  authService = inject(AuthService);
  userDetails: any;
  role: string = "";
  batchId: string | null = null;

  totalCourses: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; 
  pageSize: number = 3; 
  pageNumber: number = 1; 
  paginatedData: StudentResultResponseDto[] = [];
  isSearchMode: boolean = false;

  constructor() {
    this.checkUserRole();
  }

  ngOnInit() {
    // Ensure batchId is retrieved before calling getBatchResults
    this.batchId = this.route.snapshot.paramMap.get('batchId');
    this.getBatchResults();
  }

  getBatchResults() {
    if (!this.batchId) {
      alert("Batch ID is required.");
      this.router.navigateByUrl("dashboard");
      return;
    }

    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.resultService.getBatchResults(this.batchId, params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalCourses = response.totalRecords;
      } else {
        alert(response.message);
        this.router.navigateByUrl("dashboard");
      }
    });
  }

  onPageSizeChange() {
    this.pageNumber = 1; // Reset to first page on page size change
    this.getBatchResults(); 
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalCourses) { 
      this.pageNumber++;
      this.getBatchResults(); 
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.getBatchResults();    
    }
  }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
}
