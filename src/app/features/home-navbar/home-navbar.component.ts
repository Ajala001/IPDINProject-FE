import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { User } from '../../shared/models/interfaces/userUpdate';
import { NotificationService } from '../../shared/services/notification/notification.service';
import { UserService } from '../../core/services/user/user.service';
import { apiResponse } from '../../shared/models/interfaces/apiResponse';

@Component({
  selector: 'app-home-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './home-navbar.component.html',
  styleUrl: './home-navbar.component.css',
})
export class HomeNavbarComponent {
  // === Public Properties ===
  @Output() toggleSidebar = new EventEmitter<void>();
  user: User | null = null;
  isDropdownOpen = false;

  // === Constructor ===
  constructor(
    public authService: AuthService,
    private router: Router,
    private notifier: NotificationService,
    private userService: UserService
  ) {
    // Subscribe to auth state
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
    });

    // Load user details from token
    const userDetails = this.authService.getUserDetailsFromToken();
    if (userDetails?.NameIdentifier) {
      this.fetchUserByEmail(userDetails.NameIdentifier);
    }
  }

  // === Event Handlers ===
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  signOut() {
    this.authService.signOut().subscribe({
      next: () => {
        localStorage.removeItem('userToken');
        this.authService.clearUser();
        this.notifier.show('Signed out successfully.', 'info');
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.notifier.show('Sign-out failed. Please try again.', 'error');
      },
    });
  }

  // === Private Methods ===
  private fetchUserByEmail(email: string) {
    this.userService.getUserByEmail(email).subscribe((response: apiResponse) => {
      if (response.isSuccessful) {
        this.user = response.data;
        this.authService.setUser(response.data); // Sync user in AuthService
      }
    });
  }
}
