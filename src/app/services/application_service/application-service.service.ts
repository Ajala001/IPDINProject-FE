import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { ApplicationModel } from '../../models/classes/application';
import { ApplicationUpdateModel } from '../../models/interfaces/applicationUpdate';
import { ApplicationRejectionModel } from '../../models/interfaces/applicationRejection';
import { pagedResponse } from '../../models/interfaces/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class ApplicationServiceService {

  constructor(private http: HttpClient) { }

  createApplication(application: ApplicationModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createApplicationUrl, application);
  }

  getApplications(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getApplicationsUrl, { params: queryParams })
  }

  getUserApplications(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getUserApplicationsUrl, { params: queryParams })
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
    return this.http.post<apiResponse>(`${environment.apiUrl}${apiEndpoints.rejectApplicationUrl(applicationId)}`, rejectionReason);
  }

  searchApplications(params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();

    // Create query parameters
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            queryParams = queryParams.append(key, params[key].toString());
        }
    }

    return this.http.get<pagedResponse>(`${environment.apiUrl}${apiEndpoints.searchApplicationsUrl}`, { params: queryParams });
  }

}
