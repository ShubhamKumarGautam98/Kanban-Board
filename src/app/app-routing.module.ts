import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { RegisterTeammatesComponent } from './register-teammates/register-teammates.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"main-page",
    redirectTo:""
  },
  
  {
    path:"dash",
    component:DashboardComponent

  },
  {
    path:"addtask",
    component:AddTaskComponent
  },
  {
    path:"register",
    component:RegisterTeammatesComponent
  },
  {
    path:"**",//matches anything
    component:ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
