import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth_service/auth.service';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebars/sidebar/sidebar.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  activeLink: string = 'home'; // Default active link


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
    debugger;
    this.authService.signOut().subscribe({
      next: () => {
        localStorage.removeItem('userToken');
        this.router.navigateByUrl("home");
      },
      error: (error) => {
        alert(error);
      }
    });
  }

  userDetails: any;
  fullName: string = "";
  userEmail: string = "";

  constructor(){
    this.userDetails = this.authService.getUserDetailsFromToken();
    if(this.userDetails){
      this.fullName = this.userDetails["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
      this.userEmail = this.userDetails["NameIdentifier"]
    }
  }
}
