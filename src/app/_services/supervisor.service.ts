import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SupervisorService {
  constructor(private _http: HttpClient) {}

  addSupervisor(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/supervisors', data);
  }

  updateSupervisor(id: number, data: any): Observable<any> {
    return this._http.put(`http://localhost:3000/supervisors/${id}`, data);
  }

  getSupervisorList(): Observable<any> {
    return this._http.get('http://localhost:3000/supervisors');
  }

  deleteSupervisor(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/supervisors/${id}`);
  }
}
