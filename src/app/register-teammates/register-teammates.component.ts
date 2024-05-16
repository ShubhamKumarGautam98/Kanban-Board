import { Component } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { user } from '../model/user';
import { ToastrService } from 'ngx-toastr';
import { SnackbarService } from '../services/snackbar.service';

@Component({
  selector: 'app-register-teammates',
  templateUrl: './register-teammates.component.html',
  styleUrls: ['./register-teammates.component.css']
})
export class RegisterTeammatesComponent {
  hide = true;
  userData: user = {
    emailId: "",
    userName: "",
    password: "",
    role: "user",
    taskslist: undefined
  };

  constructor(
    private userServiceService: UserService,
    private snackBar:SnackbarService,
    private route: Router
  ) {}

  register() {
    console.log("User Data:", this.userData); // Debugging: Log user data
    console.log("UserName:", this.userData.userName);
    console.log("Email:", this.userData.emailId);
    console.log("Password:", this.userData.password);
    console.log("Role:", this.userData.role);

    if (
      this.userData.userName.trim() &&
      this.userData.emailId.trim() &&
      this.userData.password.trim() &&
      this.userData.role.trim()
    ) {
      this.userServiceService.register(this.userData).subscribe(
        (res) => {
          console.log("Registration Response:", res); // Debugging: Log registration response

          this.snackBar.openSnackBar("Registered","Successfully");
          this.route.navigateByUrl("dash");

          // Sending email
          const mailBody = {
            recipient: this.userData.emailId,
            msgBody: `
              Dear ${this.userData.userName},
              Thank you for registering with our Kanban Board Service! Your registration is successful. You can now log in to your account and start managing your projects efficiently.
              your Password ${this.userData.password}
              Best regards,
              Shubham
              Team: Work Planner
            `,
           
            subject: 'Registration Confirmation'
          };

          this.userServiceService.sendMail(mailBody).subscribe(
            (resp) => {
              console.log("Email Response:", resp); // Debugging: Log email sending response
              this.snackBar.openSnackBar("Email sent","successfully");
            },
            (err) => {
              console.error("Error sending email:", err);
              this.snackBar.openSnackBar("Failed to send email."," Please try again later.");
            }
          );
        },
        (err) => {
          console.error("Registration Error:", err); // Debugging: Log registration error
          this.snackBar.openSnackBar("User Already Exist","try again");
        }
      );
    } else {
      this.snackBar.openSnackBar("Fields cannot be empty","fill the fields");
    }
  }
}
