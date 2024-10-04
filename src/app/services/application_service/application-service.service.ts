import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { ApplicationModel } from '../../models/classes/application';
import { ApplicationUpdateModel } from '../../models/interfaces/applicationUpdate';
import { ApplicationRejectionModel } from '../../models/interfaces/applicationRejection';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  constructor(private http: HttpClient) { }

  createApplication(application: ApplicationModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createApplicationUrl, application);
  }

  getApplications() : Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getApplicationsUrl)
  }

  getApplicationById(applicationId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getApplicationByIdUrl(applicationId)}`);
  }

  updateApplicationById(applicationId: string, updateRequest: ApplicationUpdateModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateApplicationUrl(applicationId)}`, updateRequest);
  }

  deleteApplicationById(applicationId: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteApplicationUrl(applicationId)}`);
  }
  
  downloadApplicationSlip(applicationId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.downloadApplicationSlipUrl(applicationId)}`);
  }

  acceptApplication(applicationId: string): Observable<apiResponse>{
    return this.http.post<apiResponse>(`${environment.apiUrl}${apiEndpoints.acceptApplicationUrl(applicationId)}`, {});
  }

  rejectApplication(applicationId: string, rejectionReason: ApplicationRejectionModel): Observable<apiResponse>{
    return this.http.post<apiResponse>(`${environment.apiUrl}${apiEndpoints.acceptApplicationUrl(applicationId)}`, rejectionReason);
  }


}
