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

  createProperty2(property: Property): Observable<any> {

    const cityId = property.cityId; // Access the stateId from the property object

    // Check if stateId is not undefined before converting to string and setting as query parameter
    const params = new HttpParams().set('cityId', cityId !== undefined ? cityId.toString() : '');


    return this.http.post(
      AUTH_API + 'createProperty',property, { params: params } );
  }


  createProperty(property: Property, files: FileList | null): Observable<Property> {
    const formData = new FormData();
    if (property.name !== undefined) {
      formData.append('name', property.name);
    }
    if (property.description !== undefined) {
      formData.append('description', property.description);
    }
  
    if (property.status !== undefined) {
      formData.append('status', property.status);
    }
    formData.append('bedrooms', property.bedrooms.toString());
    formData.append('bathrooms', property.bathrooms.toString());
    formData.append('size', property.size.toString());
    formData.append('price', property.price.toString());
  
    if (property.cityId !== undefined) {
      formData.append('cityId', property.cityId.toString());
    }
  
    if (files !== null && files instanceof FileList) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files.item(i) ?? '');
      }
    } else {
      console.error('Invalid file input');
    }
  
    const httpOptions = {
      headers: new HttpHeaders(),
      params: new HttpParams()
    };
  
    return this.http.post<Property>('http://localhost:8080/api/auth/properties', formData, httpOptions);

  }
  
  








}
