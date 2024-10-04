import { Component, inject, OnInit } from '@angular/core';
import { menus } from '../../constants/menus';
import { AuthService } from '../../services/auth_service/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user_service/user.service';
import { apiResponse } from '../../models/interfaces/apiResponse';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

  authService = inject(AuthService)
  userDetails: any;
  menus: any = [];
  role: string = "";
  filteredMenus: any[] = [];
  

  constructor(){
    debugger;
    this.menus = menus //coming from constants
    this.userDetails = this.authService.getUserDetailsFromToken();
    if (this.userDetails) {
      this.role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    }
    debugger;
    this.menus.forEach((element: any) => {
      const isRolePresent = element.roles.find((role:any)=>role == this.role);
      debugger;
      if(isRolePresent != undefined){
        this.filteredMenus.push(element);
      }
    });

   
  }

  ngOnInit(): void {
    
  }


  userService = inject(UserService)
  users: apiResponse[] = [];
  router = inject(Router)

  getUser(){
    debugger;
    this.userService.getUsers().subscribe((response : apiResponse)=>{
      if(response.isSuccessful){
        this.users = response.data;
        alert("Data Received Successfully");
        debugger;
        console.log(this.users)
        this.router.navigateByUrl("user");
      }
    })
  }

  menuList: string[] = [
      "order", "home"
  ]
  expandedMenu: string = "";

  onExpand(menu: string){
    this.expandedMenu = menu;
  }
}
