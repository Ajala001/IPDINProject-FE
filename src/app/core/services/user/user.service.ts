import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiEndpoints } from '../../constants/constant';
import { AddAdminModel } from '../../../shared/models/classes/admin';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { environment } from '../../../../environments/environment';
import { pagedResponse } from '../../../shared/models/interfaces/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  addAdmin(adminUser: AddAdminModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.addAdmin, adminUser)
  }

  getUsers(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getUsersUrl, { params: queryParams })
  }

  getUserByEmail(email: string): Observable<apiResponse> {
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getUserByEmailUrl(email)}`);
  }

  updateUser(email: string, formData: FormData): Observable<apiResponse> {
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateUserUrl(email)}`, formData);
  }

  deleteUser(email: string): Observable<apiResponse> {
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteUserUrl(email)}`);
  }

  searchUsers(params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            queryParams = queryParams.append(key, params[key].toString());
        }
    }
    return this.http.get<pagedResponse>(`${environment.apiUrl}${apiEndpoints.searchUsersUrl}`, { params: queryParams });
  }

}
