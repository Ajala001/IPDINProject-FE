import { Component, inject } from '@angular/core';
import { UserService } from '../../../services/user_service/user.service';
import { Router, RouterLink } from '@angular/router';
import { UserResponseModel } from '../../../models/interfaces/userUpdate';
import { pagedResponse } from '../../../models/interfaces/pagedResponse';
import { SearchQueryModel } from '../../../models/classes/searchQuery';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css'
})
export class UserListComponent {

  userService = inject(UserService);
  router = inject(Router);


  totalUsers: number = 0;
  pageSizes: number[] = [3, 5, 10, 25, 50]; // Options for page size
  pageSize: number = 3;  // Default page size
  pageNumber: number = 1; // Default page number
  paginatedData: UserResponseModel[] = [];
  isSearchMode: boolean = false;

  ngOnInit() {
    this.getUsers(); // Fetch the initial set of users on component initialization
  }

  getUsers() {
    const params = { pageSize: this.pageSize, pageNumber: this.pageNumber };
    this.userService.getUsers(params).subscribe((response: pagedResponse) => {
      if (response.isSuccessful) {
        this.paginatedData = response.data;
        this.totalUsers = response.totalRecords;
        this.router.navigateByUrl("users");
      } else {
        alert(response.message);
        this.router.navigateByUrl("dashboard");
      }
    });
  }

  genderMap: { [key: number]: string } = {
    1: 'Male',
    2: 'Female',
    3: 'Other'
  };


  // Adjust page size and decide whether to search or get all users
  onPageSizeChange() {
    this.pageNumber = 1; // Reset to the first page when page size changes

    // Check if the search query exists; if it does, search. If not, get all courses
    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.searchUsers();  // Search if there is a search query
    } else {
      this.getUsers();     // Otherwise, fetch all courses
    }
  }

  nextPage() {
    if (this.pageNumber * this.pageSize < this.totalUsers) { 
      this.pageNumber++;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchUsers();  // Fetch search results if in search mode
      } else {
        this.getUsers();     // Otherwise, fetch all courses
      }
    }
  }

  previousPage() {
    if (this.pageNumber > 1) {
      this.pageNumber--;
      if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
        this.searchUsers();  // Fetch search results if in search mode
      } else {
        this.getUsers();     // Otherwise, fetch all courses
      }
    }
  }


  params: SearchQueryModel = new SearchQueryModel
  searchUsers() {
    this.params.pageNumber = this.pageNumber;
    this.params.pageSize = this.pageSize;

    if (this.params.searchQuery && this.params.searchQuery.trim() !== "") {
      this.userService.searchUsers(this.params).subscribe((response: pagedResponse) => {
        if (response.isSuccessful) {
          this.paginatedData = response.data;
          this.totalUsers = response.totalRecords;
        } else {
          alert(response.message);
          this.router.navigateByUrl("dashboard"); // Navigate to dashboard on error
        }
      });
    } else {
      // If search query is empty, fetch all courses
      this.getUsers();
    }
  }
}
