import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Property} from '../_models/property';
import { Page } from '../_models/page';
import { HttpParams } from '@angular/common/http';



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
    formData.append('city_id', property.cityId.toString());
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

  getAll1(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}property`);
 }
 getAll(pageIndex: number, pageSize: number): Observable<Page<Property>> {
  const params = new HttpParams()
    .set('page', pageIndex.toString())
    .set('size', pageSize.toString());
  return this.http.get<Page<Property>>(`${this.baseUrl}property`, {params});
}

}
