import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams  } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../_models/user';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  updatePassword1(userId: number, currentPassword: string, newPassword: string): Observable<any> {
    const url = `${AUTH_API}updatePassword/${userId}`;
    const requestPayload = { currentPassword, newPassword };

    return this.http.put(url, requestPayload);
  }

  updateUser(userId: number, updatedUser: User): Observable<User> {
    const url = `${AUTH_API}updateuser/${userId}`;
    return this.http.put<User>(url, updatedUser);
  }

  updatePassword(email: string, newPassword: string, resetCode: string): Observable<any> {
    const url = this.baseUrl + 'updatePassword';

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
    return this.http.post(`${this.baseUrl}checkResetCode`, credentials);
  }

  initiatePasswordReset(email: string) {
    const headers = new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' });
    const body = new URLSearchParams();
    body.set('email', email);

    return this.http.post<boolean>(`${this.baseUrl}send-reset-code`, body.toString(), { headers });
  }

  isLoggedIn(): Observable<boolean> {
    return this.http.get<boolean>(`${AUTH_API}check-auth`);
  }

  isAuthorized(propertyId: number): Observable<boolean> {
    return this.http.get<boolean>(`${AUTH_API}isAuthorized/${propertyId}`);
  }
  
  isAdmin(): Observable<boolean> {
    return this.http.get<boolean>(`${AUTH_API}isadmin`);
  }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(`${AUTH_API}users`);
  }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string,name: string,contactNumber: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        name,
        contactNumber,
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    return this.http.post(AUTH_API + 'signout', { }, httpOptions);
  }
}