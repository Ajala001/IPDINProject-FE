import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {

  isSidebarActive = false;
  isTablesSubMenuActive = false;
  isSettingsSubMenuActive = false;

  openSidebar(): void {
    this.isSidebarActive = true;
  }

  closeSidebar(): void {
    this.isSidebarActive = false;
  }

  toggleSubMenu(menu: string): void {
    if (menu === 'tables') {
      this.isTablesSubMenuActive = !this.isTablesSubMenuActive;
    } else if (menu === 'settings') {
      this.isSettingsSubMenuActive = !this.isSettingsSubMenuActive;
    }
  }
}
