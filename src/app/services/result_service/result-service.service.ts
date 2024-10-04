import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { ResultUpdateModel } from '../../models/interfaces/resultUpdate';

@Injectable({
  providedIn: 'root'
})
export class ResultServiceService {

  constructor(private http: HttpClient) { }

  uploadResult(file: File): Observable<apiResponse> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.uploadResultUrl, formData, {
    });
  }

  getResults() : Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getResultsUrl)
  }

  getresultByMembershipNo(membershipNumber: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getStudentResultUrl(membershipNumber)}`);
  }

  updateStudentResult(membershipNumber: string, updateRequest: ResultUpdateModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.UpdateStudentResultUrl(membershipNumber)}`, updateRequest);
  }

  deleteStudentResult(membershipNumber: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteStudentResultUrl(membershipNumber)}`);
  }
}
