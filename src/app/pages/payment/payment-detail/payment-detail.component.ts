import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaymentServiceService } from '../../../services/payment_service/payment-service.service';
import { PaymentResponseModel } from '../../../models/classes/payment';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth_service/auth.service';

@Component({
    selector: 'app-payment-detail',
    imports: [CommonModule, RouterLink],
    templateUrl: './payment-detail.component.html',
    styleUrl: './payment-detail.component.css'
})
export class PaymentDetailComponent {
  
  constructor(private route: ActivatedRoute) {
    this.checkUserRole();
  }

  paymentService = inject(PaymentServiceService)
  router = inject(Router)
  paymentRef: string | null = null;
  payment!: PaymentResponseModel
 
  
  isAdmin: boolean = false;
  authService = inject(AuthService)
  userDetails: any;
  role: string = "";

  ngOnInit(): void {
    this.paymentRef = this.route.snapshot.paramMap.get('refNo');
  
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      if (token) {
        this.fetchPaymentDetails(token);
      }
    });
  
    if (this.paymentRef) {
      this.getPaymentByRefno(this.paymentRef);
    }
  }
  

  paymentStatusMap: { [key: number]: string } = {
    1: 'Successful',
    2: 'Failed',
  };

  getPaymentByRefno(refNo: string){
    this.paymentService.getPaymentByRefno(refNo).subscribe((response: apiResponse) =>{
      if(response.isSuccessful){
          this.payment = response.data
      }
    })
  }

  fetchPaymentDetails(token: string): void {
    this.paymentService.getPaymentDetails(token).subscribe((response: apiResponse) =>{
      if(response.isSuccessful){
          this.payment = response.data
      }
    })
  }

  checkUserRole() {
    this.userDetails = this.authService.getUserDetailsFromToken();
    const role = this.userDetails["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    this.isAdmin = role === 'Admin';
  }
}

