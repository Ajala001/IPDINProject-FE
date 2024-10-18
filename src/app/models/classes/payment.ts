export class PaymentModel {
    entityId: string
    reasonForPayment: string

    constructor(){
        this.entityId = "";
        this.reasonForPayment = "";
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