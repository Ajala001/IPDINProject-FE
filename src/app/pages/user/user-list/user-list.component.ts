import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user_service/user.service';
import { Router, RouterLink } from '@angular/router';
import { UserResponseModel } from '../../../models/interfaces/userUpdate';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { SearchQueryModel } from '../../../models/classes/searchQuery';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule, FormsModule, RouterLink, MatIconModule, MatDividerModule, MatToolbarModule, 
    MatFormFieldModule, MatSelectModule, MatInputModule, MatButtonModule, MatTableModule
  ],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {
  userService = inject(UserService);
  router = inject(Router);

  totalUsers: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50];
  pageSize: number = 3;
  pageNumber: number = 1;
  paginatedData: UserResponseModel[] = [];
  params: SearchQueryModel = new SearchQueryModel(); // Ensure it's declared early
  genderMap: { [key: number]: string } = {
    1: 'Male',
    2: 'Female',
    3: 'Other'
  };

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const query = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.userService.getUsers(query).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalUsers = response.totalRecords;
      } else {
        alert(response.message);
        this.router.navigateByUrl("dashboard");
      }
    });
  }

 searchUsers() {
  this.params.pageSize = this.pageSize;
  this.params.pageNumber = this.pageNumber;

  debugger;
  if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
    this.userService.searchUsers(this.params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalUsers = response.totalRecords;
      } else {
        debugger;
        // Show "no match" message without navigating away
        this.paginatedData = [];
        this.totalUsers = 0;
        alert(response.message); // Optional: replace with snackbar or styled message
      }
    });
  } else {
    this.getUsers();
  }
}


  onPageSizeChange() {
    this.pageNumber = 1;
    this.searchUsers(); // Handles both search & non-search logic
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalUsers) {
      this.pageNumber++;
      this.searchUsers();
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      this.searchUsers();
    }
  }
}
