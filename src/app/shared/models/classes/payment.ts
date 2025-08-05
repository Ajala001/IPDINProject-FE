export class PaymentModel {
    serviceId: string
    paymentType: number

    constructor(){
        this.serviceId = "";
        this.paymentType = 0;
    }
  }


  export interface PaymentResponseModel {
    id: string;          
    payerFullName: string;
    amount: number;   
    paymentRef: string;    
    paymentFor: string;    
    createdAt: string;        
    status: number;
  }