import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../sidebars/sidebar/sidebar.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HeaderComponent } from "../header/header.component";
import { HomeComponent } from '../home/home.component';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent, DashboardComponent, HomeComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  isSidebarVisible: boolean = false; // Tracks sidebar visibility

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }




 
}
