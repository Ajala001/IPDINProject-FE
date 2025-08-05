import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from '../../shared/services/notification/notification.service';

@Component({
  selector: 'app-access-denied',
  imports: [MatIconModule, RouterLink],
  templateUrl: './access-denied.component.html',
  styleUrl: './access-denied.component.css'
})
export class AccessDeniedComponent {
constructor(
  private router: Router,
  private route: ActivatedRoute
) {}

 notifier = inject(NotificationService);

serviceId: string | null = null;
paymentType: string | null = null;

ngOnInit(): void {
    const queryParams = this.route.snapshot.queryParamMap;
    this.serviceId = queryParams.get('serviceId');
    this.paymentType = queryParams.get('paymentType');

    console.log('serviceId:', this.serviceId);
    console.log('paymentType:', this.paymentType);
  }

  payNow() {
  if (this.serviceId) {
    this.router.navigate(['/payments/initiate', this.serviceId], {
      queryParams: { paymentType: this.paymentType }
    });
  } else {
     console.log('Service Id:', this.serviceId)
    this.notifier.show('Service ID is missing. Cannot proceed to payment.');
    // Optionally show an error to the user
  }
}


  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
