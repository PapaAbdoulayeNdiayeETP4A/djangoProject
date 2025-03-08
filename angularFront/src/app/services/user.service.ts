import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUrl = 'http://127.0.0.1:8000/api/user/';
  loginUrl = 'http://127.0.0.1:8000/auth/';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post(this.loginUrl, userData);
  }
}
