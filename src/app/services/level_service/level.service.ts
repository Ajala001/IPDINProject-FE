import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { Observable } from 'rxjs';
import { LevelModel } from '../../models/classes/level';


@Injectable({
  providedIn: 'root'
})
export class LevelService {

  constructor(private http: HttpClient) { }

  createLevel(level: LevelModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createLevelUrl, level)
  }

  getLevels() : Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getLevelsUrl)
  }

  getLevelById(levelId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getLevelByIdUrl(levelId)}`);
  }

  updateLevelById(levelId: string, updateRequest: LevelModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateLevelUrl(levelId)}`, updateRequest);
  }

  deleteLevelById(levelId: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteLevelUrl(levelId)}`);
  }

}
