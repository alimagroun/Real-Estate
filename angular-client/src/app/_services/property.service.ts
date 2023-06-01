import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Property} from '../_models/property';
import { Page } from '../_models/page';
import { HttpParams } from '@angular/common/http';
import{Photo} from "../_models/photo";
import{PropertyFilter} from "../_models/propertyFilter";



@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private baseUrl = 'http://localhost:8080/api/auth/';
  private baseUrl1 = 'http://localhost:8080/api/properties';
  constructor(private http: HttpClient) { }

  getPropertiesByFilter(filter: PropertyFilter): Observable<Property[]> {
    let params = new HttpParams();
  
    // Set the filter properties as parameters
    if (filter.status) {
      params = params.set('status', filter.status);
    }
    if (filter.stateId) {
      params = params.set('stateId', filter.stateId.toString());
    }
    if (filter.minPrice) {
      params = params.set('minPrice', filter.minPrice.toString());
    }
    if (filter.maxPrice) {
      params = params.set('maxPrice', filter.maxPrice.toString());
    }
    if (filter.bedrooms) {
      params = params.set('bedrooms', filter.bedrooms.toString());
    }
    if (filter.bathrooms) {
      params = params.set('bathrooms', filter.bathrooms.toString());
    }
    if (filter.cityId) {
      params = params.set('cityId', filter.cityId);
    }
  
    return this.http.get<Property[]>(`${this.baseUrl1}/filter`, { params: params });
  }
  

  getPropertiesByFilter1(status: string,filter: PropertyFilter): Observable<Property[]> {
    console.log('Status:', status);
    return this.http.get<Property[]>(`${this.baseUrl1}/filter/${status}`);
  }
  

  getProperty(id: number): Observable<Property> {
    return this.http.get<Property>(`${this.baseUrl1}/${id}`);
  }
  getPhotos(propertyId: number): Observable<Photo[]> {
    return this.http.get<Photo[]>(`${this.baseUrl1}/${propertyId}/photos`);
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
    return this.http.put(`${this.baseUrl1}/${id}`, property);
  }

  deleteProperty(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl1}/${id}`);
  }

  getProperties(): Observable<Property[]> {
    return this.http.get<Property[]>(this.baseUrl);
  }

  getAll1(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.baseUrl}property`);
 }
 getAll(pageIndex: number, pageSize: number, filter?: string): Observable<Page<Property>> {
  let params = new HttpParams()
    .set('page', pageIndex.toString())
    .set('size', pageSize.toString());
  
  if (filter) {
    params = params.set('filter', filter);
  }
  
  return this.http.get<Page<Property>>(`${this.baseUrl}property`, { params });
}

}
