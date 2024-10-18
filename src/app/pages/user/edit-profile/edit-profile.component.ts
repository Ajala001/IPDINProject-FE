import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user_service/user.service';
import { UserResponseModel, UserUpdateModel } from '../../../models/interfaces/userUpdate';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  route = inject(ActivatedRoute);
  userService = inject(UserService);
  router = inject(Router);
  userEmail: string | null = null;
  userProfile!: UserResponseModel

  user: UserUpdateModel = {
    phoneNumber: '', 
    dateOfBirth: '', 
    profilePic: null, 
    streetNo: 0, 
    streetName: '',
    city: '',
    stateOfResidence: '',
    localGovt: '',
    stateOfOrigin: '',
    country: '',
    driverLicenseNo: '',
    yearIssued: 0, 
    expiringDate: '',
    yearsOfExperience: 0, 
    nameOfCurrentDrivingSchool: ''
  };
  
  genderMap: { [key: number]: string } = {
    1: 'Male',
    2: 'Female',
    3: 'Other'
  };

  ngOnInit(): void {
    this.userEmail = this.route.snapshot.paramMap.get('email');
    if (this.userEmail) {
      this.userService.getUserByEmail(this.userEmail).subscribe({
        next: (response) => {
          this.userProfile = response.data; // Assuming API returns user details
          // Map userProfile to the user model for form binding
          this.user = {
            phoneNumber: '',
            dateOfBirth: this.userProfile.dateOfBirth || '',
            profilePic: null, 
            streetNo: 0,
            streetName:'',
            city: '',
            stateOfResidence: '',
            localGovt: this.userProfile.localGovt || '',
            stateOfOrigin: this.userProfile.stateOfOrigin || '',
            country: '',
            driverLicenseNo: this.userProfile.driverLicenseNo || '',
            yearIssued: this.userProfile.yearIssued || 0,
            expiringDate: this.userProfile.expiringDate || '',
            yearsOfExperience: this.userProfile.yearsOfExperience || 0,
            nameOfCurrentDrivingSchool: this.userProfile.nameOfCurrentDrivingSchool || ''
          };
        },
        error: (error) => {
          console.error('Error fetching user:', error);
          alert('Could not fetch user details.');
        }
      });
    }
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.user.profilePic = input.files[0]; // Store the selected file in the model
    }
  }

  updateUser(): void {
    if (this.userEmail && this.userProfile) {
      console.log(this.userProfile)
      if (confirm(`Are you sure you want to update your profile: ${this.userProfile.email}?`)) {
        this.userService.updateUser(this.userEmail, this.user).subscribe({
          next: () => {
            alert('Profile updated successfully!');
            this.router.navigate(['/users']);
          },
          error: (error) => {
            alert('An error occurred while updating your profile.');
            console.error('Update error:', error);
          },
        });
      }
    }
  }
}
