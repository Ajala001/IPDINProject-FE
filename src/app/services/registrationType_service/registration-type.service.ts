import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { Observable } from 'rxjs';
import { RegistrationTypeModel } from '../../models/classes/registrationType';

@Injectable({
  providedIn: 'root'
})
export class RegistrationTypeService {

  constructor(private http: HttpClient) { }

  createQualification(registrationType: RegistrationTypeModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createRegistrationTypeUrl, registrationType)
  }

  getRegistrationTypes() : Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getRegistrationTypesUrl)
  }

  getRegistrationTypeById(registrationTypeId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getRegistrationTypeByIdUrl(registrationTypeId)}`);
  }

  updateRegistrationTypeById(registrationTypeId: string, updateRequest: RegistrationTypeModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateRegistrationTypeUrl(registrationTypeId)}`, updateRequest);
  }

  deleteRegistrationTypeById(registrationTypeId: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteRegistrationTypeUrl(registrationTypeId)}`);
  }

}
