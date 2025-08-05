import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { HomeNavbarComponent } from '../home-navbar/home-navbar.component';
import { FooterComponent } from '../../shared/services/footer/footer.component';

@Component({
    selector: 'app-contact',
    imports: [ReactiveFormsModule, CommonModule, HomeNavbarComponent, FooterComponent],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css'
})
export class ContactComponent {
    contactForm!: FormGroup;
    http: any;

  constructor(
    private fb: FormBuilder, 
  ) {}

  ngOnInit(): void {
    // Initialize the contact form with validation
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      subject: ['', [Validators.required]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Getter to access form controls easily in the template
  get f() {
    return this.contactForm.controls as { [key: string]: AbstractControl };
  }

  // Submit the form data to the backend
  onSubmit(): void {
    if (this.contactForm.valid) {
      this.sendMessage(this.contactForm.value).subscribe(response => {
        alert('Message sent successfully!');
        this.contactForm.reset(); // Reset form after successful submission
      }, error => {
        alert('Failed to send message. Please try again later.');
      });
    } else {
      alert('Please fill in all required fields correctly.');
    }
  }

  // Method to send the contact form data via HTTP POST
  sendMessage(formData: any): Observable<any> {
    return this.http.post('https://your-backend-url.com/api/contact', formData);
  }
}
