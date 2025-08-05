import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoints } from '../../constants/constant';
import { PaymentModel } from '../../../shared/models/classes/payment';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { environment } from '../../../../environments/environment';
import { pagedResponse } from '../../../shared/models/interfaces/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class PaymentServiceService {

  constructor(private http: HttpClient) { }

  initiatePayment(paymentData: PaymentModel, token?: string): Observable<apiResponse> {
    let url = `${environment.apiUrl}${apiEndpoints.initiatePaymentUrl}`;
    if (token) {  
      url += `?token=${encodeURIComponent(token)}`;
    }
    return this.http.post<apiResponse>(url, paymentData);
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

  getUserPayments(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getUserPaymentsUrl, { params: queryParams })
  }

  getPaymentByRefno(referenceNo: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getPaymentsByRefNoUrl(referenceNo)}`);
  }

  getPaymentDetails(token: string): Observable<apiResponse> {
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getPaymentDetails(token)}`);
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
