import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { ExaminationModel } from '../../models/interfaces/examination';
import { ExaminationUpdateModel } from '../../models/interfaces/examinationUpdate';

@Injectable({
  providedIn: 'root'
})
export class ExaminationService {

  constructor(private http: HttpClient) { }

  createExamination(examination: ExaminationModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createExaminationUrl, examination);
  }

  getExaminations(): Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getExaminationsUrl)
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
  
  searchExaminations(): Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.searchExaminationUrl);
  }

}