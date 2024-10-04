import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { UserUpdateModel } from '../../models/interfaces/userUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<apiResponse> {
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getUsersUrl)
  }

  getUserByEmail(email: string): Observable<apiResponse> {
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getUserByEmailUrl(email)}`);
  }

  updateUser(email: string, updateRequest: UserUpdateModel): Observable<apiResponse> {
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateUserUrl(email)}`, updateRequest);
  }

  deleteUser(email: string): Observable<apiResponse> {
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteUserUrl(email)}`);
  }

}
