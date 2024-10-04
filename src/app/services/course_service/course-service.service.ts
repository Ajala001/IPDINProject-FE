import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CourseModel } from '../../models/classes/course';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { CourseUpdateModel } from '../../models/interfaces/courseUpdate';

@Injectable({
  providedIn: 'root'
})
export class CourseServiceService {

  constructor(private http: HttpClient) { }

  createCourse(course: CourseModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createCourseUrl, course);
  }

  getCourses() : Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getCoursesUrl)
  }

  getCourseById(courseId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getCourseByIdUrl(courseId)}`);
  }

  updateCourseById(courseId: string, updateRequest: CourseUpdateModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateCourseUrl(courseId)}`, updateRequest);
  }

  deleteCourseById(courseId: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteCourseUrl(courseId)}`);
  }
  
  searchCourses(params: { [key: string]: any }): Observable<apiResponse> {
    const queryString = apiEndpoints.searchCoursesUrl(params); // Use the function from constants
    return this.http.get<apiResponse>(`${environment.apiUrl}/courses/search?${queryString}`);
  }
}
