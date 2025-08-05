import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ResetPasswordModel } from '../../../shared/models/classes/Reset-Password';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';

@Component({
    selector: 'app-reset-password',
    imports: [FormsModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent implements OnInit{

  authService = inject(AuthService)
  resetPassObj: ResetPasswordModel = new ResetPasswordModel();

  router = inject(Router)
  route = inject(ActivatedRoute)

  showNewPassword: boolean = false;
  showConPassword: boolean = false;

  togglePasswordVisibilityNew() {
    this.showNewPassword = !this.showNewPassword;
  }

  togglePasswordVisibilityCon() {
    this.showConPassword = !this.showConPassword;
  }


  ngOnInit(): void {
    this.route.queryParams.subscribe((params)=>{
      this.resetPassObj.email = params["email"];
      this.resetPassObj.token = params["token"];
    })
  }

  resetPassword(){
    this.authService.resetPassword(this.resetPassObj).subscribe((response: apiResponse)=>{
      if(response.isSuccessful){
        alert(response.message)
        this.router.navigateByUrl('auth/sign-in')
      }else {
        alert(response.message)
      }
    })
  }
}
