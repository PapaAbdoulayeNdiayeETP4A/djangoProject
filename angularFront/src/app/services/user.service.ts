import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, switchMap, tap, throwError } from 'rxjs';

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
      }),
      switchMap(() => this.getUserInfo())
    );
  }


  /*getUserIdFromToken(): number | null {
    const token = localStorage.getItem('access_token');
    if (!token) return null;
  
    try {
      const decoded: any = jwtDecode(token);
      return decoded.user_id;
    } catch (error) {
      console.error("Erreur de décodage du token :", error);
      return null;
    }
  }*/

  getUserInfo(): Observable<any> {
    const token = localStorage.getItem('access_token');
    if (!token) return throwError(() => new Error("Pas de token disponible"));

    const userInfoUrl = `http://127.0.0.1:8000/user-info`;

    return this.http.get<{ id: number, username: string, email: string, is_student: boolean, is_teacher: boolean, projects: any }>(userInfoUrl, {
      headers: { Authorization: `Bearer ${token}` }
    }).pipe(
      tap(user => {
        localStorage.setItem('user_id', user.id.toString());
        localStorage.setItem('user_email', user.email);
        localStorage.setItem('user_username', user.username);
        localStorage.setItem('is_student', user.is_student ? 'true' : 'false');
        localStorage.setItem('is_teacher', user.is_teacher ? 'true' : 'false');

        if (user.projects) {
          localStorage.setItem('user_projects', JSON.stringify(user.projects));
        }

        if (user.projects && user.projects.length > 0) {
          const allTasks = user.projects.reduce((tasks: any, project: any) => {
            if (project.tasks && project.tasks.length > 0) {
              return [...tasks, ...project.tasks];
            }
            return tasks;
          }, []);

          if (allTasks.length > 0) {
            localStorage.setItem('user_tasks', JSON.stringify(allTasks));
          }
        }
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
