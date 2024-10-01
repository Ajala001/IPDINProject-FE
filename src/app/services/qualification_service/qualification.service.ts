import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AcademicQualificationModel } from '../models/classes/academicQualification';
import { apiResponse } from '../models/interfaces/apiResponse';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../environments/environment';
import { apiEndpoints } from '../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class QualificationService {

  constructor(private http: HttpClient) { }

  addQualification(qualification: AcademicQualificationModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.addQualification, qualification)
  }
}
