import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mcart-frontend';
  username:string = undefined;

  constructor( private router: Router) { }

  showLoginView(){

  }

  logout(){
    this.router.navigate(['/welcome']);
  }
}
