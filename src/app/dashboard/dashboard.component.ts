import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { Task } from '../model/task';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { SnackbarService } from '../services/snackbar.service';
// import { LogincheckService } from '../loginService/logincheck.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  taskData: Array<Task> = [];
  currentTask: any;
  userName = '';
  UserRole = '';
  sessionMail = sessionStorage.getItem('userEmail');

  constructor(private userService: UserService, private snackBar: SnackbarService, private router: Router) {}

  ngOnInit() {
    this.refreshTask();
    this.userService.getUserName().subscribe((resp) => {
      this.userName = resp;
    });
    this.userService.getUserRole().subscribe((resp) => {
      this.UserRole = resp;
    });
  }

  refreshTask() {
    this.userService.getAllTask().subscribe((taskData: any) => {
      this.taskData = taskData;
    });
  }

  getTasksCount(column: string): number {
    const filteredTasks = this.filterTasks(column);
    return filteredTasks ? filteredTasks.length : 0;
  }

  filterTasks(status: string): Task[] {
    const filteredTasks = this.taskData?.filter((m) => m.status === status);
    return filteredTasks ? this.sortTasks(filteredTasks) : [];
  }

  filterAllUserTasks(status: string): Task[] {
    const filteredTasks = this.taskData?.filter((c) => c.status === status && c.assignTo === this.sessionMail);
    return filteredTasks ? this.sortTasks(filteredTasks) : [];
  }

  sortTasks(tasks: Task[]): Task[] {
    return tasks.sort((a, b) => {
      const priorityOrder = { Low: 2, Medium: 1, High: 0 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  deleteTask(id: any) {
    this.userService.deleteTask(id).subscribe(
      (resp) => {
        this.snackBar.openSnackBar('Task deleted', 'Successfully');
        this.refreshTask();
      },
      (err) => {
        this.snackBar.openSnackBar('Something went wrong', 'Failed');
      }
    );
  }

  onDragStart(task: Task) {
    this.currentTask = task;
  }

  onDrop($event: any, status: string) {
    $event.preventDefault();
    let taskToUpdate: any;
  
    if (this.UserRole.toLowerCase() === 'user') {
      taskToUpdate = this.taskData.find(task => task.taskId === this.currentTask.taskId);
    } else {
      console.error('Unknown UserRole:', this.UserRole);
      return; // Exit function if UserRole is neither 'Admin' nor 'user'
    }
  
    if (!taskToUpdate) {
      console.error('Task not found:', this.currentTask.taskId);
      return; // Exit function if task is not found
    }
  
    // Check if the task is being moved to "Completed" directly from "To Do"
    if (status.toLowerCase() === 'completed' && taskToUpdate.status.toLowerCase() !== 'in progress') {
      console.error('Task must be in progress before moving to completed');
      return; // Exit function if task is not in progress
    }
  
    taskToUpdate.status = status;
  
    // Update task status in both admin and user arrays
    const index = this.taskData.findIndex(task => task.taskId === taskToUpdate.taskId);
    if (index !== -1) {
      this.taskData[index].status = status;
    }
  
    // Update task in the database
    this.userService.updateTask(taskToUpdate).subscribe(
      (response) => {
        console.log('Status updated successfully', response);
        this.snackBar.openSnackBar("Task Moved"," Successfully");
      },
      (error) => {
        console.error('Error updating task:', error);
        // this.snackBar.openSnackBar("Failed to move task"," Please try again.");
      }
    );
  
    this.currentTask = null; // Reset currentTask after updating
  }

  onDragOver(event: any) {
    event.preventDefault();
  }

  addTask() {
    this.router.navigateByUrl('addtask');
  }
}

  // allusers(){
  //   this.userService.getAllUsers().subscribe((allUsersData:any)=>{
  //     this.allUsersData=allUsersData[0].taskList;
  //     console.log(this.allUsersData);
  //   })
  // }

   // navigate-to-add-task
  // addTask(){
  //     this.router.navigateByUrl("addtask")
  // }
