import { Component, OnInit, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
// import { LogincheckService } from '../loginService/logincheck.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    Role: string | null = null;
    constructor(private userService:UserService ,private router:Router){}
  ngOnInit(): void 
  {
    this.userService.getUserRole().subscribe((data)=>{this.Role=data
      console.log(data);
      
    })
    
  }

  logout(){
    
    sessionStorage.clear();
    this.Role=null;
    this.router.navigateByUrl("")
  }

}
