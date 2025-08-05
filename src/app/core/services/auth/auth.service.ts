import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiEndpoints } from '../../constants/constant';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { ApiResponse, apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { environment } from '../../../../environments/environment';
import { SignUpModel } from '../../../shared/models/classes/SignUp';
import { SignInModel } from '../../../shared/models/classes/SignIn';
import { authResponse } from '../../../shared/models/interfaces/authResponse';
import { ResetPasswordModel } from '../../../shared/models/classes/Reset-Password';
import { changePasswordModel } from '../../../shared/models/classes/ChangePasswordModel';
import { User } from '../../../shared/models/interfaces/userUpdate';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

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

  setUser(user: User) {
    this.currentUserSubject.next(user);
  }

  // Call this on logout
  clearUser() {
    this.currentUserSubject.next(null);
  }

  get isUserLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

}


