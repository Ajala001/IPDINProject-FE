import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { Observable } from 'rxjs';
import { SignUpModel } from '../../models/classes/SignUp';
import { SignInModel } from '../../models/classes/SignIn';
import { ResetPasswordModel } from '../../models/classes/Reset-Password';
import { jwtDecode } from 'jwt-decode';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }


  signUp(signUpReq: SignUpModel): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.signUp, signUpReq)
  }

  signIn(signInReq: SignInModel): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.signIn, signInReq)
  }

  signOut() {
    return this.http.post(environment.apiUrl + apiEndpoints.signOut, {})
  }

  forgetPassword(email: string): Observable<apiResponse> {
    const url = `${environment.apiUrl}${apiEndpoints.forgetPassword}?email=${encodeURIComponent(email)}`;
    return this.http.post<apiResponse>(url, {}); // Empty body since email is in the query param
  }

  resetPassword(resetPassReq: ResetPasswordModel): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.resetPassword, resetPassReq)
  }


  private tokenKey = 'userToken';
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUserDetailsFromToken(): any {
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode(token);
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    }
    return null;
  }

}

