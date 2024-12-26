import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth_service/auth.service';
import { changePasswordModel } from '../../models/classes/ChangePasswordModel';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { apiResponse } from '../../models/interfaces/apiResponse';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.css'
})
export class ChangePasswordComponent{

  authService = inject(AuthService)
  changePassObj: changePasswordModel = new changePasswordModel();

  router = inject(Router)
  route = inject(ActivatedRoute)
  userDetails: any; 

  constructor(){
    this.userDetails = this.authService.getUserDetailsFromToken();
    if(this.userDetails){
      this.changePassObj.email = this.userDetails["NameIdentifier"]
    }
  }

  showCurrentPassword: boolean = false;
  showNewPassword: boolean = false;

  togglePasswordVisibilityNew() {
    this.showCurrentPassword = !this.showCurrentPassword;
  }

  togglePasswordVisibilityCon() {
    this.showNewPassword = !this.showNewPassword;
  }


  changePassword(){
    this.authService.changePassword(this.changePassObj).subscribe((response: apiResponse)=>{
      if(response.isSuccessful){
        alert(response.message)
        this.router.navigateByUrl('dashboard')
      }else {
        alert(response.message)
      }
    })
  }
}
