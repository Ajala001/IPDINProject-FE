import { Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { Router, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth_service/auth.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebars/sidebar/sidebar.component';
import { UserService } from '../../services/user_service/user.service';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { UserResponseModel } from '../../models/interfaces/userUpdate';
import { NotificationService } from '../../shared/notification.service';

@Component({
    selector: 'app-header',
    imports: [CommonModule, RouterModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(
    private notifier: NotificationService
  ){
    this.userDetails = this.authService.getUserDetailsFromToken();
    if(this.userDetails){
      this.fullName = this.userDetails["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      this.userEmail = this.userDetails["NameIdentifier"]
    }

    this.getUserByEmail(this.userEmail);
  }

  @Output() toggleSidebar = new EventEmitter<void>();
  isDropdownOpen = false;

  isSidebarOpen = true;
  isSidebarMinimized = false;
  
  toggleMinimize(): void {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }


  activeLink: string = 'home'; // Default active link
   userService = inject(UserService)


  // Method to set the active link when clicked
  setActive(link: string): void {
    this.activeLink = link;
  }

  // Method to check if a link is active
  isActive(link: string): boolean {
    return this.activeLink === link;
  }

  authService = inject(AuthService)
  router = inject(Router)

  signOut() {
  this.authService.signOut().subscribe({
    next: () => {
      localStorage.removeItem('userToken');

      this.notifier.show('Signed out successfully.', 'info'); // ✅ Show message

      this.router.navigateByUrl('home');
    },
    error: (error) => {
      this.notifier.show('Sign-out failed. Please try again.', 'error'); // ❌ Show error
    }
  });
}


  userDetails: any;
  fullName: string = "";
  userEmail: string = "";
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


  getUserByEmail(email: string){
    debugger;
      this.userService.getUserByEmail(email).subscribe((response: apiResponse) =>{
        if(response.isSuccessful){
          debugger;
          console.log(response.data);
          debugger;
            this.user = response.data
        }
      })
    }
  
}
