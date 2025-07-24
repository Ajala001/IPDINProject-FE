import { Component, inject } from '@angular/core';
import { UserResponseModel } from '../../../models/interfaces/userUpdate';
import { UserService } from '../../../services/user_service/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-detele-account',
    imports: [FormsModule, CommonModule],
    templateUrl: './detele-account.component.html',
    styleUrl: './detele-account.component.css'
})
export class DeteleAccountComponent {

  userEmail: string | null = null;
  user: UserResponseModel | null = null; // Replace with your course type

  userService = inject(UserService);
  router = inject(Router);
  route = inject(ActivatedRoute);

  genderMap: { [key: number]: string } = {
    1: 'Male',
    2: 'Female',
    3: 'Other'
  };

  ngOnInit(): void {
 
    this.userEmail = this.route.snapshot.paramMap.get('email');
    if (this.userEmail) {
      this.userService.getUserByEmail(this.userEmail).subscribe({
        next: (res) => {
          this.user = res.data; 
        },
        error: (error) => {
          console.error('Error fetching user:', error);
          alert('Could not fetch user details.');
        }
      });
    }
  }

  confirmDelete(): void {
    if (this.userEmail) {
      if (confirm(`Are you sure you want to delete this account: ${this.user?.email}?`)) {
        this.userService.deleteUser(this.userEmail).subscribe({
          next: () => {
            alert('Account deleted successfully!');
            this.router.navigate(['/users']);
          },
          error: (error) => {
            alert('An error occurred while deleting the account.');
            console.error('Delete error:', error);
          },
        });
      }
    }
  }

  cancelDelete(): void {
    this.router.navigate(['/users']); // Navigate back to the courses list
  }
}
