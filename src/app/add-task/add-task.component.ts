import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { user } from '../model/user';
import { SnackbarService } from '../services/snackbar.service';
// import { task } from '../model/task';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent  {

  taskData:any = { status: 'To do', assignedBy: sessionStorage.getItem('userEmail') };
  userData: user[] =[];
  userEmails: string[] = [];
  minDate: Date = new Date();
  constructor(private router: Router,private userService: UserService , private snackBar:SnackbarService) {}


  ngOnInit() {

    this.getUserName();
  }

  addTask() {
    console.log("taskData:",this.taskData);
    this.userService.addTask(this.taskData).subscribe(
      (resp) => {
        console.log(resp);
        let mailBody = {
          recipient: this.taskData.assignTo,
          msgBody: `Dear User,
        A new task has been added to you by ${sessionStorage.getItem('userEmail')} in Kanban Board! 
        Details of the task:
        - Task Title: ${this.taskData.taskName}
        - Description: ${this.taskData.taskDescription}
        - Assigned To: ${this.taskData.assignTo}
        - Priority : ${this.taskData.priority}
        - Due Date: ${this.taskData.dueDate}
        
        Please check your Kanban Board for more details.
        
        Best regards,
        sharath
        Team : Work Planner `,
          subject: 'Task Added Successfully',
        };

        this.userService.sendMail(mailBody).subscribe((resp)=>{
          
        });
        this.snackBar.openSnackBar('Task Added',' Successfully');
        this.router.navigateByUrl('dash');
      },
      (err) => {
        this.snackBar.openSnackBar('Task Not Added',' Something went wrong');
            }
    );
  }

  getUserName() {
    this.userService.getAllUserEmail().subscribe((userData: any) => {
      this.userData=userData;
     
    });
  }
}

