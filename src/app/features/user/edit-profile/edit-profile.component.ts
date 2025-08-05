import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../core/services/user/user.service';
import { UserResponseModel, UserUpdateModel } from '../../../shared/models/interfaces/userUpdate';

@Component({
    selector: 'app-edit-profile',
    imports: [CommonModule, FormsModule, RouterModule],
    templateUrl: './edit-profile.component.html',
    styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  route = inject(ActivatedRoute);
  userService = inject(UserService);
  router = inject(Router);
  userEmail: string | null = null;
  
  userProfile: UserResponseModel = {
    id: '',
    fullName: '',
    membershipNumber: '',
    email: '',
    gender: 0,
    dateOfBirth: '',
    profilePic: '',
    address: '',
    localGovt: '',
    level: '',
    stateOfOrigin: '',
    driverLicenseNo: '',
    yearIssued: 0,
    expiringDate: '',
    yearsOfExperience: 0,
    nameOfCurrentDrivingSchool: '',
    academicQualifications: []
  };

  user: UserUpdateModel = {
    phoneNumber: '', 
    dateOfBirth: '', 
    profilePic: null, 
    streetNo: '', 
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
            streetNo: '',
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
        console.log(this.userProfile);
        console.log(this.user);
        if (confirm(`Are you sure you want to update your profile: ${this.userProfile.email}?`)) {
            const formData = new FormData();
            formData.append('phoneNumber', this.user.phoneNumber);
            formData.append('dateOfBirth', this.user.dateOfBirth);
            if (this.user.profilePic) {
                formData.append('profilePic', this.user.profilePic);
            }
            formData.append('streetNo', this.user.streetNo);
            formData.append('streetName', this.user.streetName);
            formData.append('city', this.user.city);
            formData.append('stateOfResidence', this.user.stateOfResidence);
            formData.append('localGovt', this.user.localGovt);
            formData.append('stateOfOrigin', this.user.stateOfOrigin);
            formData.append('country', this.user.country);
            formData.append('driverLicenseNo', this.user.driverLicenseNo);
            formData.append('yearIssued', this.user.yearIssued.toString());
            formData.append('expiringDate', this.user.expiringDate);
            formData.append('yearsOfExperience', this.user.yearsOfExperience.toString());
            formData.append('nameOfCurrentDrivingSchool', this.user.nameOfCurrentDrivingSchool);

            this.userService.updateUser(this.userEmail, formData).subscribe({
                next: () => {
                    alert('Profile updated successfully!');
                    this.router.navigateByUrl(`users/${this.userEmail}/detail`);
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
