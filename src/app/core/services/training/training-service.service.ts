import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { TrainingModel } from '../../../shared/models/classes/training';
import { environment } from '../../../../environments/environment';
import { apiEndpoints } from '../../constants/constant';
import { pagedResponse } from '../../../shared/models/interfaces/pagedResponse';

@Injectable({
  providedIn: 'root'
})
export class TrainingServiceService {

  constructor(private http: HttpClient) { }

  createTraining(training: TrainingModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createTrainingUrl, training)
  }

  getTrainings(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getTrainingsUrl, { params: queryParams })
  }

  getUserTrainings(params: { [key: string]: any }) : Observable<pagedResponse>{
    let queryParams = new HttpParams(); 
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        queryParams = queryParams.append(key, params[key]);
      }
    }
    return this.http.get<pagedResponse>(environment.apiUrl + apiEndpoints.getUserTrainingsUrl, { params: queryParams })
  }

  getTraininById(trainingId: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getTrainingByIdUrl(trainingId)}`);
  }

  updatetrainingByid(trainingId: string, updateRequest: TrainingModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateTrainingUrl(trainingId)}`, updateRequest);
  }

  deleteTraining(trainingId: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteTrainingUrl(trainingId)}`);
  }

  searchTrainings(params: { [key: string]: any }): Observable<pagedResponse> {
    let queryParams = new HttpParams();
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            queryParams = queryParams.append(key, params[key].toString());
        }
    }
    return this.http.get<pagedResponse>(`${environment.apiUrl}${apiEndpoints.searchtrainingUrl}`, { params: queryParams });
  }
}
