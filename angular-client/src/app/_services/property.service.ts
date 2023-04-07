import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Property} from '../_models/property';


const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  constructor(private http: HttpClient) {}


  getAll(): Observable<Property[]> {
     return this.http.get<Property[]>(`${AUTH_API}property`);
  }

  createProperty(property: Object): Observable<any> {
    return this.http.post(
      AUTH_API + 'createProperty',property );
  }









}
