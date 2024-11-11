import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { ResultUpdateModel } from '../../models/interfaces/resultUpdate';
import { pagedResponse } from '../../models/interfaces/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {

  constructor(private http: HttpClient) { }

  // getResults(params: { [key: string]: any }) : Observable<pagedResponse>{
  //   let queryParams = new HttpParams(); 
  //   for (const key in params) {
  //     if (params.hasOwnProperty(key)) {
  //       queryParams = queryParams.append(key, params[key]);
  //     }
  //   }
  //   return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getResultsUrl, { params: queryParams })
  // }

  getStudentResults(membershipNumber: string, params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    const url = `${environment.apiUrl}${apiEndpoints.getStudentResultsUrl}/${membershipNumber}`;
    return this.http.get<pagedResponse>(url, { params: queryParams });
  }

  getBatchResults(batchResultId: string, params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            queryParams = queryParams.append(key, params[key]);
        }
    }
    const url = `${environment.apiUrl}${apiEndpoints.getBatchResultsUrl}/${batchResultId}`;
    return this.http.get<pagedResponse>(url, { params: queryParams });
}

  updateStudentResult(membershipNumber: string, updateRequest: ResultUpdateModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.UpdateStudentResultUrl(membershipNumber)}`, updateRequest);
  }

  deleteStudentResult(membershipNumber: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteStudentResultUrl(membershipNumber)}`);
  }

  searchResult(params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            queryParams = queryParams.append(key, params[key].toString());
        }
    }
    return this.http.get<pagedResponse>(`${environment.apiUrl}${apiEndpoints.searchResultsUrl}`, { params: queryParams });
  }
}
