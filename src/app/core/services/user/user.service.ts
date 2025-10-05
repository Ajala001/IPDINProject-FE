import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { apiEndpoints } from '../../constants/constant';
import { AddAdminModel } from '../../../shared/models/classes/admin';
import { ApiResponse, apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { environment } from '../../../../environments/environment';
import { pagedResponse } from '../../../shared/models/interfaces/pagedResponse';
import { UserResponseModel } from '../../../shared/models/interfaces/userUpdate';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userImageSource = new BehaviorSubject<string | null>(null);
  userImage$ = this.userImageSource.asObservable();

  constructor(private http: HttpClient) {}
  initializeUserImage(email: string) {
    this.getUserByEmail(email).subscribe({
      next: (response: ApiResponse<UserResponseModel>) => {
        if (response.isSuccessful && response.data?.profilePic) {
          this.userImageSource.next(response.data.profilePic);
        }
      },
      error: (err) => console.error('Failed to load user image:', err)
    });
  }

  updateUserImage(newImageUrl: string) {
    this.userImageSource.next(newImageUrl);
  }

  addAdmin(adminUser: AddAdminModel): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.addAdmin, adminUser)
  }

  getUsers(params: { [key: string]: any }): Observable<pagedResponse> {
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

  updateUser(email: string, formData: FormData): Observable<ApiResponse<UserResponseModel>> {
    return this.http.put<ApiResponse<UserResponseModel>>(
      `${environment.apiUrl}${apiEndpoints.updateUserUrl(email)}`,
      formData
    );
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
