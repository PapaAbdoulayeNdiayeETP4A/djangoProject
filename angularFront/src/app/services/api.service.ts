import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://127.0.0.1:8000';
  httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }
  
  getAllProjects(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/project/', {headers: this.httpHeaders});
  }

  createProject(project: any): Observable<any> {
    const token = localStorage.getItem('access_token');
    return this.http.post(this.baseUrl + '/api/project/', project, {headers: { Authorization: `Bearer ${token}`}});
  }

  getAllTasks(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/task/', {headers: this.httpHeaders});
  }

  createTask(task: any): Observable<any> {
    return this.http.post(this.baseUrl + '/api/task/', task);
  }

  updateTask(task: any): Observable<any> {
    return this.http.put(this.baseUrl + '/api/task/' + task.id, task);
  }

  deleteTask(taskId: number): Observable<any> {
    return this.http.delete(this.baseUrl + '/api/task/' + taskId);
  }

  assignTask(task: any): Observable<any> {
    return this.http.put(this.baseUrl + '/api/task/' + task.id, task);
  }

}
