import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrainingModel } from '../../models/classes/training';
import { Observable } from 'rxjs';
import { apiResponse } from '../../models/interfaces/apiResponse';
import { environment } from '../../environments/environment';
import { apiEndpoints } from '../../constants/constant';

@Injectable({
  providedIn: 'root'
})
export class TrainingServiceService {

  constructor(private http: HttpClient) { }

  createTraining(training: TrainingModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createTrainingUrl, training)
  }

  getTrainings() : Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getTrainingsUrl)
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
}
