import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { AdminNavbarComponent } from "../sidebars/admin-navbar/admin-navbar.component";
import { RouterOutlet } from '@angular/router';




@Component({
    selector: 'app-layout',
    imports: [HeaderComponent, AdminNavbarComponent, RouterOutlet],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})
export class LayoutComponent {

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

