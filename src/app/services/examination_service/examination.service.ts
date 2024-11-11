import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { ExaminationModel } from '../../models/classes/examination';
import { ExaminationUpdateModel } from '../../models/interfaces/examinationUpdate';
import { pagedResponse } from '../../models/interfaces/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private http: HttpClient) { }

  createExamination(examination: ExaminationModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createExaminationUrl, examination);
  }

  getExaminations(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getExaminationsUrl, { params: queryParams })
  }

  getUserExaminations(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getUserExaminationsUrl, { params: queryParams })
  }


  getExaminationById(examinationId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getExaminationByIdUrl(examinationId)}`);
  }

  updateExaminationById(examinationId: string, updateRequest: ExaminationUpdateModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateExaminationUrl(examinationId)}`, updateRequest);
  }

  deleteExaminationById(examinationId: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteExaminationUrl(examinationId)}`);
  }
  
  searchExaminations(params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();

    // Create query parameters
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            queryParams = queryParams.append(key, params[key].toString());
        }
    }
    return this.http.get<pagedResponse>(`${environment.apiUrl}${apiEndpoints.searchExaminationUrl}`, { params: queryParams });
  }

}