import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { State } from '../_models/state';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class StateService {

  private baseUrl = environment.stateBaseUrl; 

  constructor(private http: HttpClient) { }

  getStates(): Observable<State[]> {
    return this.http.get<State[]>(`${this.baseUrl}`);
  }

}