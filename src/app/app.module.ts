import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule} from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';


import {MatInputModule} from '@angular/material/input';


import {MatSelectModule} from '@angular/material/select';

import {MatSnackBarModule} from '@angular/material/snack-bar';

import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';

import {MatTableModule} from '@angular/material/table';
import { LoginComponent } from './login/login.component';

import { HeaderComponent } from './header/header.component';

import { HomeComponent } from './home/home.component';

import { RegisterTeammatesComponent } from './register-teammates/register-teammates.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FooterComponent } from './footer/footer.component';

import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './auth-interceptor.interceptor';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    HomeComponent,
   
    RegisterTeammatesComponent,
    SearchComponent,
    DashboardComponent,
    AddTaskComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    MatInputModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatSelectModule,
    MatDatepickerModule,
    MatTableModule,
    DragDropModule,
    MatFormFieldModule,
    MatDatepicker,
    RouterModule,
    ToastrModule.forRoot() ,
    MatNativeDateModule,
    MatDialogModule
   

  ],
  providers: [
    provideAnimationsAsync(),{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
