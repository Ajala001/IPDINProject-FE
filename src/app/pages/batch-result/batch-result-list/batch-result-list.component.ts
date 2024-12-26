import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { BatchResultService } from '../../../services/batch-result_service/batch-result.service';
import { AuthService } from '../../../services/auth_service/auth.service';
import { BatchResultResponseDto } from '../../../models/interfaces/resultResponse';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { SearchQueryModel } from '../../../models/classes/searchQuery';

@Component({
  selector: 'app-batch-result-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './batch-result-list.component.html',
  styleUrl: './batch-result-list.component.css'
})
export class BatchResultListComponent {

  batchResultService = inject(BatchResultService);
  router = inject(Router);

  isAdmin: boolean = false;
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";

  constructor(){
    this.checkUserRole();
  }

  totalCourses: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; 
  pageSize: number = 3; 
  pageNumber: number = 1; 
  paginatedData: BatchResultResponseDto[] = [];
  isSearchMode: boolean = false;

  ngOnInit() {
    this.getBatchResults(); 
  }

  getBatchResults() {
    debugger;
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.batchResultService.getBatchResults(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        console.log(response.data);
        this.totalCourses = response.totalRecords;
        debugger;
        debugger;
        this.router.navigateByUrl("batchResults");
      } else {
        alert(response.message);
        this.router.navigateByUrl("dashboard");
      }
    });
  }


  onPageSizeChange() {
    this.pageNumber = 1; 
    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.searchBatchResults();  
    } else {
      this.getBatchResults(); 
    }
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalCourses) { 
      this.pageNumber++;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchBatchResults(); 
      } else {
        this.getBatchResults(); 
      }
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchBatchResults();  
      } else {
        this.getBatchResults();    
      }
    }
  }


  params: SearchQueryModel = new SearchQueryModel
  searchBatchResults() {
    this.params.pageNumber = this.pageNumber;
    this.params.pageSize = this.pageSize;
    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.batchResultService.searchBatchResult(this.params).subscribe((response: pagedResponse) => {
        if (response.isSuccessful) {
          this.paginatedData = response.data;
          this.totalCourses = response.totalRecords;
        } else {
          alert(response.message);
          this.router.navigateByUrl("dashboard"); 
        }
      });
    } else {
      // If search query is empty, fetch all courses
      this.getBatchResults();
    }
  }


  // goToResults(batchId: string, examId: string) {
  //   debugger;
  //   this.router.navigate(['/results', batchId], { queryParams: { examId: examId } });
  // }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
}
