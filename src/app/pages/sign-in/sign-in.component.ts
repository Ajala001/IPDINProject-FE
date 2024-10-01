import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth_service/auth.service';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { SignInModel } from '../../models/classes/SignIn';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  authService = inject(AuthService)
  signInObj: SignInModel = new SignInModel();

  router = inject(Router)


  showPassword: boolean = false;

  togglePasswordVisibility1() {
    this.showPassword = !this.showPassword;
  }


  signIn() {
    debugger;
    this.authService.signIn(this.signInObj).subscribe((response: apiResponse) => {
      if (response.isSuccessful) {
        alert(response.message)
        localStorage.setItem('userToken', response.data);
        this.router.navigateByUrl("dashboard");
      } else {
        alert(response.message)
        this.router.navigateByUrl("home")
      }
    })
  }
}

