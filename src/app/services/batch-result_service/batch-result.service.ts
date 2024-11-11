import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { apiEndpoints } from '../../constants/constant';
import { pagedResponse } from '../../models/interfaces/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class BatchResultService {

  constructor(private http: HttpClient) { }

  uploadResult(formData: FormData, examId: string): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.uploadBatchResultUrl(examId), formData, {
    });
  }

  getBatchResults(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getBatchResultsUrl, { params: queryParams })
  }

  searchBatchResult(params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            queryParams = queryParams.append(key, params[key].toString());
        }
    }
    return this.http.get<pagedResponse>(`${environment.apiUrl}${apiEndpoints.searchBatchResultsUrl}`, { params: queryParams });
  }

  getBatchResultById(batchResultId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getBatchResultByIdUrl(batchResultId)}`);
  }

  deleteBatchResult(batchResultId: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteBatchResultUrl(batchResultId)}`);
  }
}
