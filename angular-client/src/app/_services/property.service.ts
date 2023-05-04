import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Property} from '../_models/property';
@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl = 'http://localhost:8080/api/auth/';

  constructor(private http: HttpClient) { }

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl}/${id}`);
  }

  createProperty(property: Property, files: any[]): Observable<any> {
    const formData = new FormData();
    formData.append('name', property.name);
    formData.append('description', property.description);
    formData.append('status', property.status);
    formData.append('bedrooms', property.bedrooms.toString());
    formData.append('bathrooms', property.bathrooms.toString());
    formData.append('size', property.size.toString());
    formData.append('price', property.price.toString());
    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }
    return this.http.post(`${this.baseUrl}properties`, formData);
  }

  updateProperty(id: number, property: Property): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, property);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl);
  }

  getAll(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}property`);
 }
}
