import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../../services/user_service/user.service';
import { UserResponseModel } from '../../../models/interfaces/userUpdate';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {
  
  constructor(private route: ActivatedRoute) {}
  userService = inject(UserService)
  router = inject(Router)
  userEmail: string | null = null;
  user!: UserResponseModel
 
  genderMap: { [key: number]: string } = {
    1: 'Male',
    2: 'Female',
    3: 'Other'
  };


  ngOnInit(): void {
    this.userEmail = this.route.snapshot.paramMap.get('email');
    this.getUserByEmail(this.userEmail!);
  }

  getUserByEmail(email: string){
    this.userService.getUserByEmail(email).subscribe((response: apiResponse) =>{
      if(response.isSuccessful){
          this.user = response.data
      }
    })
  }
}
