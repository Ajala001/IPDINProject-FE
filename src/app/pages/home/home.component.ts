import { Component } from '@angular/core';
import { HomeNavbarComponent } from "../home-navbar/home-navbar.component";
import { AboutUsComponent } from "../about-us/about-us.component";
import { ContactComponent } from "../contact/contact.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeNavbarComponent, AboutUsComponent, ContactComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
