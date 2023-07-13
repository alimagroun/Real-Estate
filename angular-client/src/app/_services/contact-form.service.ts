import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ContactForm } from '../_models/ContactForm';
import { Page } from '../_models/page';

@Injectable({
  providedIn: 'root'
})
export class ContactFormService {
  private baseUrl = 'http://localhost:8080/api/contact-forms';

  constructor(private http: HttpClient) { }

  getAllContactForms(pageNumber: number, pageSize: number): Observable<Page<ContactForm>> {
    const params = new HttpParams()
      .set('page', pageNumber.toString())
      .set('size', pageSize.toString());
    return this.http.get<Page<ContactForm>>(this.baseUrl, { params });
  }

  getContactFormById(id: number): Observable<ContactForm> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<ContactForm>(url);
  }

  createContactForm(contactForm: ContactForm): Observable<ContactForm> {
    return this.http.post<ContactForm>(this.baseUrl, contactForm);
  }

  updateContactForm(id: number, updatedForm: ContactForm): Observable<ContactForm> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.put<ContactForm>(url, updatedForm);
  }

  deleteContactForm(id: number): Observable<void> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<void>(url);
  }
}
