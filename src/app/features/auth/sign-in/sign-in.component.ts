import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignInModel } from '../../../shared/models/classes/SignIn';
import { AuthService } from '../../../core/services/auth/auth.service';
import { authResponse } from '../../../shared/models/interfaces/authResponse';
import { ApiResponse } from '../../../shared/models/interfaces/apiResponse';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { HomeNavbarComponent } from '../../home-navbar/home-navbar.component';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, RouterLink, HomeNavbarComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  signInObj: SignInModel = new SignInModel();

  private returnUrl: string = '/dashboard';

  constructor(
    private notifier: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.route.queryParams.subscribe(params => {
      this.returnUrl = params['returnUrl'] || '/dashboard';
    });
  }

  showPassword: boolean = false;

  togglePasswordVisibility1() {
    this.showPassword = !this.showPassword;
  }


  signIn() {
    this.authService.signIn(this.signInObj).subscribe({
      next: (response: ApiResponse<authResponse>) => {
        if (response.isSuccessful) {
          if (response.data != null) {
            localStorage.setItem('userToken', response.data.accessToken);
  
            this.notifier.show(response.message || 'Login successful!', 'success'); 
            this.router.navigateByUrl(this.returnUrl);
          }
        } else {
          this.notifier.show(response.message || 'Login failed.', 'error'); 
          this.router.navigateByUrl('/auth/sign-in');
        }
      },
      error: (err) => {
        this.notifier.show('Login failed. Please try again.', 'error'); 
      }
    });
  }  

  signUp() {
    this.router.navigateByUrl('/auth/sign-up');
  }
}

