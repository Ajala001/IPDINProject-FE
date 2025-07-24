import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth_service/auth.service';

@Component({
    selector: 'app-member-navbar',
    imports: [CommonModule, RouterModule],
    templateUrl: './member-navbar.component.html',
    styleUrl: './member-navbar.component.css'
})
export class MemberNavbarComponent {

  authService = inject(AuthService)
  router = inject(Router)

  
  userDetails: any;
  membershipNumber: string = "";
  userEmail: string = "";

  constructor(){
    this.userDetails = this.authService.getUserDetailsFromToken();
    if(this.userDetails){
      this.userEmail = this.userDetails["NameIdentifier"]
      this.membershipNumber = this.userDetails["MembershipNum"]
    }
  }

  isSidebarOpen = false;

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  sidebarSections = [
    {
      id: 'profile-collapse',
      title: 'Profile',
      icon: 'bi bi-person',
      links: [
        { route: '/member/profile', label: 'View Profile', icon: 'bi bi-person-badge' }
      ]
    },
    {
      id: 'courses-collapse',
      title: 'Courses',
      icon: 'bi bi-journal-bookmark',
      links: [
        { route: '/member/courses', label: 'My Courses', icon: 'bi bi-book' }
      ]
    },
    {
      id: 'results-collapse',
      title: 'My Results',
      icon: 'bi bi-bar-chart',
      links: [
        { route: '/member/results', label: 'View Results', icon: 'bi bi-clipboard-check' }
      ]
    }
  ];
}
