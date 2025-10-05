import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminNavbarComponent } from '../features/sidebars/admin-navbar/admin-navbar.component';
import { HomeNavbarComponent } from '../features/home-navbar/home-navbar.component';




@Component({
    selector: 'app-layout',
    imports: [HomeNavbarComponent, AdminNavbarComponent, RouterOutlet],
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.css'
})
export class LayoutComponent {

  isSidebarOpen = true;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

