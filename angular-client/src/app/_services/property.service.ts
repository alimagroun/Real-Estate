import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

  createProperty(property: Property): Observable<any> {

    const stateId = property.stateId; // Access the stateId from the property object

    // Check if stateId is not undefined before converting to string and setting as query parameter
    const params = new HttpParams().set('stateId', stateId !== undefined ? stateId.toString() : '');


    return this.http.post(
      AUTH_API + 'createProperty',property, { params: params } );
  }









}
