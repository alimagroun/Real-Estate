import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from '../_models/state';

const AUTH_API = 'http://localhost:8080/api/auth/';

@Injectable({
  providedIn: 'root'
})
export class StateService {

 

  private baseUrl = 'http://localhost:8080/api/auth/'; // Update the URL to match your Spring Boot backend endpoint

  constructor(private http: HttpClient) { }

  // Retrieve list of states
  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseUrl}states`);
  }





}