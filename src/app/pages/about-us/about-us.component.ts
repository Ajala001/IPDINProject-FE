import { Component } from '@angular/core';
import Aos from 'aos';

@Component({
    selector: 'app-about-us',
    imports: [],
    templateUrl: './about-us.component.html',
    styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
    ngOnInit() {
        Aos.init({ once: true, duration: 800 });
      }
}
