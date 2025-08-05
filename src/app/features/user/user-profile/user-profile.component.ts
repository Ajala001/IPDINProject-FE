import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../core/services/user/user.service';
import { UserResponseModel } from '../../../shared/models/interfaces/userUpdate';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';


@Component({
    selector: 'app-user-profile',
    imports: [FormsModule, CommonModule, RouterModule],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  
  constructor(private route: ActivatedRoute) {}
  userService = inject(UserService)
  router = inject(Router)
  userEmail: string | null = null;
  user: UserResponseModel = {
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
 
  genderMap: { [key: number]: string } = {
    1: 'Male',
    2: 'Female',
    3: 'Other'
  };


  ngOnInit(): void {
    this.userEmail = this.route.snapshot.paramMap.get('email');
    this.getUserByEmail(this.userEmail!);
  }

  getUserByEmail(email: string){
    this.userService.getUserByEmail(email).subscribe((response: apiResponse) =>{
      if(response.isSuccessful){
        console.log(response.data);
          this.user = response.data
      }
    })
  }

  navigateToAddQualification() {
    this.router.navigate([`/qualifications/create/${this.userEmail}`]);
  }

  

}
