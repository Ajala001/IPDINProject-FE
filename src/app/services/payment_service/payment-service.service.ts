import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PaymentModel } from '../../models/classes/payment';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { pagedResponse } from '../../models/interfaces/pagedResponse';

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

  getPayments(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getPaymentsUrl, { params: queryParams })
  }

  getPaymentByRefno(referenceNo: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getPaymentsByRefNoUrl(referenceNo)}`);
  }

  searchPayments(params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            queryParams = queryParams.append(key, params[key].toString());
        }
    }
    return this.http.get<pagedResponse>(`${environment.apiUrl}${apiEndpoints.searchPaymentsUrl}`, { params: queryParams });
  }

  deletePayment(referenceNo: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deletePaymentUrl(referenceNo)}`);
  }

}
