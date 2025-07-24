import { Component } from '@angular/core';
import Aos from 'aos';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent {
  ngOnInit(): void {
    Aos.init({ duration: 800, once: true });
  }
}
