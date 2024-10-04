import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentModel } from '../../models/classes/payment';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http: HttpClient) { }

  initiatePayment(paymentData: PaymentModel): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.initiatePaymentUrl, paymentData);
  }
  
  verifyPayment(referenceNo: string): Observable<apiResponse> {
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.verifyPaymentUrl, {
      params: { reference: referenceNo }
    });
  }

  getPayments(): Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getPaymentsUrl)
  }

  getPaymentByRefno(referenceNo: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getPaymentsByRefNoUrl(referenceNo)}`);
  }

  // updatePaymentByRefNo(referenceNo: string): Observable<apiResponse>{
  //   return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updatePaymentUrl(referenceNo)}`);
  // }

  deletePayment(referenceNo: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deletePaymentUrl(referenceNo)}`);
  }

}
