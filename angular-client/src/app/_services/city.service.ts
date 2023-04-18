import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../_models/city';

const AUTH_API = 'http://localhost:8080/api/auth/';


@Injectable({
  providedIn: 'root'
})
export class CityService {

  

  private baseUrl = 'http://localhost:8080/api/auth/'; 

  constructor(private http: HttpClient) { }

  getCitiesByState(stateId: number): Observable<City[]> {
    return this.http.get<City[]>(`${this.baseUrl}getCitiesByState?stateId=${stateId}`);
  }
  







}
