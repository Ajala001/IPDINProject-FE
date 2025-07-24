import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home-navbar',
    imports: [RouterLink, CommonModule],
    templateUrl: './home-navbar.component.html',
    styleUrl: './home-navbar.component.css'
})
export class HomeNavbarComponent {
  activeLink: string = 'home'; // Default active link

  // Method to set the active link when clicked
  setActive(link: string): void {
    console.log('Setting active link to:', link);
    this.activeLink = link;
  }

  // Method to check if a link is active
  isActive(link: string): boolean {
    return this.activeLink === link;
  }

  scrollTo(sectionId: string) {
    const targetElement = document.getElementById(sectionId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

}
