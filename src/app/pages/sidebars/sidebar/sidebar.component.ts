import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../admin-navbar/admin-navbar.component';
import { MemberNavbarComponent } from '../member-navbar/member-navbar.component';
import { AuthService } from '../../../services/auth_service/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [AdminNavbarComponent, MemberNavbarComponent, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent{

  authService = inject(AuthService)
  userDetails: any;
  role: string = "";
  
  isAdmin: boolean = false;
  constructor() {
    this.checkUserRole();
  }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
  
}
