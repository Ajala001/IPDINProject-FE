import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicQualificationModel } from '../../models/classes/academicQualification';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(private http: HttpClient) { }

  createQualification(qualification: AcademicQualificationModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createQualificationUrl, qualification)
  }

  getQualifications(): Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getQualificationsUrl)
  }

  getQualificationById(qualificationId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getQualificationByIdUrl(qualificationId)}`);
  }

  updateQualififcationById(qualificationId: string, updateRequest: AcademicQualificationModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateQualificationUrl(qualificationId)}`, updateRequest);
  }

  deleteQualificationById(qualificationId: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteQualificationUrl(qualificationId)}`);
  }
  
}
