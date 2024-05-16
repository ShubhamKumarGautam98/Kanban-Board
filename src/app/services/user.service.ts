import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private token: string | null = null;
 
  constructor(private httpclient: HttpClient, private snackBar: MatSnackBar) {
    this.token = sessionStorage.getItem('token');
  }

  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }

  login(credentials: any): Observable<HttpResponse<any>> {
    this.token = sessionStorage.getItem('token');
    return this.httpclient.post<any>("http://localhost:8090/api/v1/login", credentials, { observe: 'response' })
    
  }

  register(userData: any): Observable<any> {
    this.token = sessionStorage.getItem('token');
    return this.httpclient.post(`http://localhost:8090/api/v2/saveUser`, userData)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error("Error:", error);
          this.snackBar.open('Failed to register user. Please try again later.', 'Close', { duration: 2000 });
          return throwError(error);
        })
      );
  }
  getName(){
    this.token = sessionStorage.getItem('token');
    return this.httpclient.get(`http://localhost:8090/api/v2/userName`,{responseType:'text'})
  }
  public getUserRole(){
    this.token = sessionStorage.getItem('token');
    return this.httpclient.get(`http://localhost:8090/api/v2/userRole`,{responseType:'text'});
  }

  sendMail(mailBody: object): Observable<any> {
    return this.httpclient.post(`http://localhost:8090/api/v4/sendEmail`, mailBody)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          console.error("Error:", error);
          this.snackBar.open('Failed to send email. Please try again later.', 'Close', { duration: 2000 });
          return throwError(error);
        })
      );
  }
  public addTask(taskData:any){
    return this.httpclient.post(`http://localhost:8090/api/v2/saveTaskToUser`,taskData);
  }
  public getAllUserEmail(){
    this.token = sessionStorage.getItem('token');
    return this.httpclient.get(`http://localhost:8090/api/v2/allUsers`);
  }
  public getAllTask(){
    this.token = sessionStorage.getItem('token');
    return this.httpclient.get(`http://localhost:8090/api/v3/getAllTask`);
  }
  public updateTask(taskData:any){
    this.token = sessionStorage.getItem('token');
    return this.httpclient.put(` http://localhost:8090/api/v2/updateTask`,taskData);
  }
  public getUserName(){
    this.token = sessionStorage.getItem('token');
    return this.httpclient.get(` http://localhost:8090/api/v2/userName`,{responseType:'text'});
  }
  public getAllUsers(){
    this.token = sessionStorage.getItem('token');
    return this.httpclient.get(` http://localhost:8090/api/v2/allUsers`);
  }
  public deleteTask(id:any){
    this.token = sessionStorage.getItem('token');
    return this.httpclient.delete(`http://localhost:8090/api/v2/deleteTask/${id}`);
  }
}
