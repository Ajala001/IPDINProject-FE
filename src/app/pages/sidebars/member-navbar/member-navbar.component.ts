import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth_service/auth.service';

@Component({
  selector: 'app-member-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './member-navbar.component.html',
  styleUrl: './member-navbar.component.css'
})
export class MemberNavbarComponent {

  authService = inject(AuthService)
  router = inject(Router)

  
  userDetails: any;
  fullName: string = "";
  userEmail: string = "";

  constructor(){
    this.userDetails = this.authService.getUserDetailsFromToken();
    if(this.userDetails){
      this.userEmail = this.userDetails["NameIdentifier"]
    }
  }
}
