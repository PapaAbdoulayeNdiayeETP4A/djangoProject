import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  registerUrl = 'http://127.0.0.1:8000/api/user/';
  loginUrl = 'http://127.0.0.1:8000/api/token/';

  constructor(private http: HttpClient) { }

  registerUser(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData);
  }

  loginUser(userData: any): Observable<any> {
    return this.http.post<{ access: string, refresh: string }>(this.loginUrl, userData).pipe(
      tap(response => {
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);
      })
    );
  }

  logoutUser() {
    return this.http.get('http://127.0.0.1:8000/api/project/');
  }


  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }

  refreshToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      return throwError(() => new Error('Pas de refresh token disponible'));
    }

    return this.http.post<{ access: string, refresh: string }>(
      'http://127.0.0.1:8000/api/token/refresh/',
      { refresh: refreshToken }
    ).pipe(
      tap(response => {
        if (response && response.access) {
          localStorage.setItem('access_token', response.access);
          if (response.refresh) {
            localStorage.setItem('refresh_token', response.refresh);
          }
        }
      })
    );
  }

}
