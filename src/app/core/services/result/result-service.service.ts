import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoints } from '../../constants/constant';
import { pagedResponse } from '../../../shared/models/interfaces/pagedResponse';
import { environment } from '../../../../environments/environment';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { ResultUpdateModel } from '../../../shared/models/interfaces/resultUpdate';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {

  constructor(private http: HttpClient) { }

  getResults(batchId: string, params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    const url = `${environment.apiUrl}${apiEndpoints.getResultsUrl(batchId)}`;
    return this.http.get<pagedResponse>(url, { params: queryParams });
  }
  
  getResultById(resultId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getResultByIdUrl(resultId)}`);
  }

  getStudentResults(membershipNumber: string, params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    const url = `${environment.apiUrl}${apiEndpoints.getStudentResultsUrl(membershipNumber)}`;
    return this.http.get<pagedResponse>(url, { params: queryParams });
  }


  updateStudentResult(membershipNumber: string, updateRequest: ResultUpdateModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.UpdateStudentResultUrl(membershipNumber)}`, updateRequest);
  }



  deleteStudentResult(membershipNumber: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteStudentResultUrl(membershipNumber)}`);
  }

  downloadResult(resultId: string) {
    return this.http.get(`${environment.apiUrl}${apiEndpoints.downloadResultUrl(resultId)}`, {
      responseType: 'blob' // Important for handling binary data
    });
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
