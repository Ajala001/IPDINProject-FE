import { Component } from '@angular/core';
import Aos from 'aos';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';

@Component({
    selector: 'app-about-us',
    imports: [HomeNavbarComponent],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
    ngOnInit() {
        Aos.init({ once: true, duration: 800 });
      }
}
