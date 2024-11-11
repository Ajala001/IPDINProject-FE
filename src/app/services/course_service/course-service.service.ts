import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseModel, CourseResponseModel } from '../../models/classes/course';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { CourseUpdateModel } from '../../models/interfaces/courseUpdate';
import { pagedResponse } from '../../models/interfaces/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {

  constructor(private http: HttpClient) { }

  createCourse(course: CourseModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createCourseUrl, course);
  }

  getCourses(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getCoursesUrl, { params: queryParams })
  }

  getCourseById(courseId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getCourseByIdUrl(courseId)}`);
  }

  updateCourseById(courseId: string, updateRequest: CourseResponseModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateCourseUrl(courseId)}`, updateRequest);
  }

  deleteCourseById(courseId: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteCourseUrl(courseId)}`);
  }
  

  searchCourses(params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();
    // Create query parameters
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            queryParams = queryParams.append(key, params[key].toString());
        }
    }
    return this.http.get<pagedResponse>(`${environment.apiUrl}${apiEndpoints.searchCoursesUrl}`, { params: queryParams });
  }
}
