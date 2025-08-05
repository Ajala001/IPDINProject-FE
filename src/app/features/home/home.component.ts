import { Component } from '@angular/core';
import { HomeNavbarComponent } from "../home-navbar/home-navbar.component";
import { AboutUsComponent } from "../about-us/about-us.component";
import { ContactComponent } from "../contact/contact.component";
import { TeamComponent } from '../team/team.component';
import { FooterComponent } from '../../shared/services/footer/footer.component';

@Component({
    selector: 'app-home',
    imports: [HomeNavbarComponent, AboutUsComponent, FooterComponent],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
})
export class HomeComponent {
    currentYear: number = new Date().getFullYear();
}
