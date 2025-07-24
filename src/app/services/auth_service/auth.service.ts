import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { apiResponse, ApiResponse } from '../../models/interfaces/apiResponse';
import { Observable } from 'rxjs';
import { SignUpModel } from '../../models/classes/SignUp';
import { SignInModel } from '../../models/classes/SignIn';
import { ResetPasswordModel } from '../../models/classes/Reset-Password';
import { jwtDecode } from 'jwt-decode';
import { changePasswordModel } from '../../models/classes/ChangePasswordModel';
import { authResponse } from '../../models/interfaces/authResponse';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signUp(signUpReq: SignUpModel): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.signUpUrl, signUpReq)
  }

  signIn(signInReq: SignInModel): Observable<ApiResponse<authResponse>> {
    return this.http.post<ApiResponse<authResponse>>(environment.apiUrl + apiEndpoints.signInUrl, signInReq)
  }

  signOut() {
    return this.http.post(environment.apiUrl + apiEndpoints.signOutUrl, {})
  }

  forgetPassword(email: string): Observable<apiResponse> {
    const url = `${environment.apiUrl}${apiEndpoints.forgetPasswordUrl}?email=${encodeURIComponent(email)}`;
    return this.http.post<apiResponse>(url, {}); // Empty body since email is in the query param
  }

  resetPassword(resetPassReq: ResetPasswordModel): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.resetPasswordUrl, resetPassReq)
  }

  changePassword(changePassReq: changePasswordModel): Observable<apiResponse> {
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.changePasswordUrl, changePassReq)
  }


  private tokenKey = 'userToken';
  
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
  const token = this.getToken();
  if (!token) return false;

  try {
    const { exp } = jwtDecode<{ exp: number }>(token);
    return Date.now() < exp * 1000;
  } catch {
    return false;
  }
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


