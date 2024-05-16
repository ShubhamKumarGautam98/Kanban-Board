import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient:HttpClient) { }
  public addTask(taskData:any){
    return this.httpClient.post(`http://localhost:8090/api/v2/saveTaskToUser`,taskData);
  }
  public getAllUsers(){
    return this.httpClient.get(`http://localhost:8090/api/v2/allUsers`);
  }
 
}
