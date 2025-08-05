import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../core/services/auth/auth.service';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';

@Component({
    selector: 'app-forget-password',
    imports: [FormsModule, CommonModule],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.css'
})


export class ForgetPasswordComponent {

  authService = inject(AuthService)
  email: string = ""
  isLoading: boolean = false;


  forgetPassword(event: Event) {
    event.preventDefault();  // Prevents form from reloading the page
    this.isLoading = true;  // Show spinner

    // Call the API to handle password reset
    this.authService.forgetPassword(this.email).subscribe({
      next: (response: apiResponse) => {
        alert(response.message);  // Show success or failure message
        this.isLoading = !response.isSuccessful;  // Stop spinner if successful
      },
      error: (err) => {
        console.error(err);  // Handle any error
        alert('An error occurred while resetting the password.');
        this.isLoading = false;  // Stop spinner on error
      },
      complete: () => {
        this.isLoading = false;  // Always stop spinner when the request is complete
      }
    });
  }

}