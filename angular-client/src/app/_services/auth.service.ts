import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../_models/user';
import { environment } from '../../environments/environment';

 const AUTH_API = 'http://localhost:8080/api/auth/';
// const AUTH_API = '/api/auth/';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private resetPasswordBaseUrl = '/api/';

  constructor(private http: HttpClient) {}

  updatePassword1(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    const url = `${this.baseUrl}/updatePassword/${userId}`;
    const requestPayload = { currentPassword, newPassword };
  
    return this.http.put(url, requestPayload);
  }
  
  updateUser(userId: number, updatedUser: User): Observable<User> {
    const url = `${this.baseUrl}/updateuser/${userId}`;
    return this.http.put<User>(url, updatedUser);
  }

  updatePassword(email: string, newPassword: string, resetCode: string): Observable<any> {
    const url = this.resetPasswordBaseUrl + 'updatePassword';

    // Prepare the request body
    const credentials = {
      email: email,
      password: newPassword,
      resetCode: resetCode
    };

    // Send the POST request to the server
    return this.http.post(url, credentials, httpOptions);
  }

  checkResetCode(email: string, resetCode: string) {
    const credentials = { email,resetCode };
    return this.http.post(`${this.resetPasswordBaseUrl}checkResetCode`, credentials);
  }

  initiatePasswordReset(email: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('email', email);

    return this.http.post<boolean>(`${this.resetPasswordBaseUrl}send-reset-code`, body.toString(), { headers });
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-auth`);
  }
  
  isAuthorized(propertyId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/isAuthorized/${propertyId}`);
  }
  
  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/isadmin`);
  }
  
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/users`);
  }
  
  login(username: string, password: string): Observable<any> {
    const url = `${this.baseUrl}/signin`;
    const body = {
      username,
      password,
    };
  
    return this.http.post(url, body, httpOptions);
  }

  register(username: string, email: string, password: string, name: string, contactNumber: string): Observable<any> {
    const url = `${this.baseUrl}/signup`;
    const body = {
      name,
      contactNumber,
      username,
      email,
      password,
    };
  
    return this.http.post(url, body, httpOptions);
  }
  
  logout(): Observable<any> {
    const url = `${this.baseUrl}/signout`;
    return this.http.post(url, {}, httpOptions);
  }

}