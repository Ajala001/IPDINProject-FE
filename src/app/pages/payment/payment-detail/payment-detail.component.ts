import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PaymentServiceService } from '../../../services/payment_service/payment-service.service';
import { PaymentResponseModel } from '../../../models/classes/payment';
import { apiResponse } from '../../../models/interfaces/apiResponse';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment-detail.component.html',
  styleUrl: './payment-detail.component.css'
})
export class PaymentDetailComponent {
  
  constructor(private route: ActivatedRoute) {}

  paymentService = inject(PaymentServiceService)
  router = inject(Router)
  paymentRef: string | null = null;
  payment!: PaymentResponseModel
 

  ngOnInit(): void {
    this.paymentRef = this.route.snapshot.paramMap.get('refNo');
    this.getPaymentByRefno(this.paymentRef!);
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
}

