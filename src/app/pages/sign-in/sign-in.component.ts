import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth_service/auth.service';
import { ApiResponse, apiResponse } from '../../models/interfaces/apiResponse';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SignInModel } from '../../models/classes/SignIn';
import { authResponse } from '../../models/interfaces/authResponse';
import { NotificationService } from '../../shared/notification.service';

@Component({
  selector: 'app-sign-in',
  imports: [FormsModule, RouterLink],
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
          this.router.navigateByUrl('/sign-in');
        }
      },
      error: (err) => {
        this.notifier.show('Login failed. Please try again.', 'error'); 
      }
    });
  }  
}

