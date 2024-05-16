import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';




// import { LogincheckService } from '../loginService/logincheck.service';
// import { userDetails } from '../model/userdetail';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {




 constructor(private fb: FormBuilder, private userService: UserService, private router: Router, public snackBar: SnackbarService) { }

 hide = true; 
    credentials={
      emailId:'',
      password:''
    }

 
    visible: boolean = false;

    togglePasswordVisibility() {
      this.visible = !this.visible;
    }

//  login-method 

  login() {
    this.userService.login(this.credentials).subscribe(
      (response) => {
        const token = response.body?.token;
     
      
        if (token) {
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('userEmail',this.credentials.emailId);
          this.snackBar.openSnackBar('login',' Successfully');
          this.router.navigateByUrl("dash");
        }
        else {
          console.error("Token not found in the response body:", response.body);
        }
      },
      (error: { error: { error: string; }; }) => {
        if (error && error.error && error.error.error === "Customer already exists") {
          alert("Customer with the same email ID already exists. Please use a different email ID.");
        } 
       }
     );
  }
}