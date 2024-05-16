import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token: string | null = null;
  

  constructor(private  httpClient: HttpClient,private router:Router) {
    this.token = sessionStorage.getItem('token');
  
  }

 
  setToken(token: string): void {
    this.token = token;
    sessionStorage.setItem('token', token);
  }

  getToken(): string | null {
    return this.token;
  }


  
  login(credentials:any): Observable<HttpResponse<any>>{
    return this.httpClient.post<any>("http://localhost:8090/api/v1/login", credentials, { observe: 'response' })
}



}



