import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebars/sidebar/sidebar.component';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

  isSidebarCollapsed = false;

  toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
  }
}

