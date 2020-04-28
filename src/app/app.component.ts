import { Component, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit,  OnChanges{
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    console.log("Inside onChanges of app component"+changes);
  }
  ngOnInit(): void {
    console.log("Inside onInit of app component");
  }
  title = 'mcart-frontend';
  username:string = undefined;

  constructor( private router: Router) {
    this.username = sessionStorage.getItem("username");
    console.log(sessionStorage.getItem("username"));
   }

  

  logout(){
    this.router.navigate(['/welcome']);
    sessionStorage.removeItem("username");
  }
}
