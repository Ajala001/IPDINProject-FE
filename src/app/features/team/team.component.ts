import { Component } from '@angular/core';
import Aos from 'aos';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../shared/services/footer/footer.component';

@Component({
  selector: 'app-team',
  imports: [HomeNavbarComponent, CommonModule, FooterComponent],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  ngOnInit(): void {
    Aos.init({ duration: 800, once: true });
  }

  instructors = [
  {
    name: 'Bello Rabiu',
    role: 'Executive Director',
    image: 'assets/images/IMG-20250726-WA0003.jpg',
    socials: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in']
  },
  {
    name: 'Salawu Mustapha',
    role: 'Training Director',
    image: 'assets/images/IMG-20250726-WA0004.jpg',
    socials: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in']
  },
  {
    name: 'Akinyele Rotimi',
    role: 'Project Director',
    image: 'assets/images/IMG-20250726-WA0007.jpg',
    socials: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in']
  },
  {
    name: 'Orebiyi Samuel',
    role: 'Membership Director',            
    image: 'assets/images/IMG-20250726-WA0020.jpg',
    socials: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in']
  },
  {
    name: 'Akinola Festus',
    role: 'Student Director',
    image: 'assets/images/IMG-20250726-WA0006_1.jpg',
    socials: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in']
  },
  {
    name: 'Ajala Abdul-Rahman',
    role: 'Technical Advisor',
    image: 'assets/images/IMG-20250726-WA0005.jpg',
    socials: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in']
  },
  {
    name: 'Adeeko Oyeyemi',
    role: 'Registrar',
    image: 'assets/images/IMG-20250728-WA0019.jpg',
    socials: ['fab fa-facebook-f', 'fab fa-twitter', 'fab fa-linkedin-in']
  }
];

}
