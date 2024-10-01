import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }


  getUsers(): Observable<apiResponse>{
      return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getUsers)
  }
}
