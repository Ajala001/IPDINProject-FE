import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-member-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './member-navbar.component.html',
  styleUrl: './member-navbar.component.css'
})
export class MemberNavbarComponent {

}
