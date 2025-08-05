import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiEndpoints } from '../../constants/constant';
import { apiResponse } from '../../../shared/models/interfaces/apiResponse';
import { environment } from '../../../../environments/environment';
import { RoleUpdateModel } from '../../../shared/models/interfaces/roleUpdate';
import { RoleModel } from '../../../shared/models/classes/role';

@Injectable({
  providedIn: 'root'
})
export class RoleServiceService {

  constructor(private http: HttpClient) { }

  createRole(role: RoleModel) : Observable<apiResponse>{
    return this.http.post<apiResponse>(environment.apiUrl + apiEndpoints.createRoleUrl, role)
  }

  getRoles() : Observable<apiResponse>{
    return this.http.get<apiResponse>(environment.apiUrl + apiEndpoints.getRolesUrl)
  }

  getRoleByName(roleName: string): Observable<apiResponse>{
    return this.http.get<apiResponse>(`${environment.apiUrl}${apiEndpoints.getRoleByNameUrl(roleName)}`);
  }

  updateRole(roleName: string, updateRequest: RoleUpdateModel): Observable<apiResponse>{
    return this.http.put<apiResponse>(`${environment.apiUrl}${apiEndpoints.updateRoleUrl(roleName)}`, updateRequest);
  }

  deleteRole(roleName: string): Observable<apiResponse>{
    return this.http.delete<apiResponse>(`${environment.apiUrl}${apiEndpoints.deleteRoleUrl(roleName)}`);
  }


}
