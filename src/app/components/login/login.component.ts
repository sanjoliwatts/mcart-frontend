import { Component, OnInit } from '@angular/core';
import { Login } from './login';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formParams:Login = new Login();
  valid = true;
  //isLoggedIn = false;
  message:Boolean;
  url:string;
  usersList:Login[];
  errorMessage: any;


  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.url = "./assets/users/users.json";
    this.loginService.login(this.url).subscribe(usersList => this.usersList = usersList);
  }

  onSubmit(){
    const loginDetail = this.usersList.filter(user => user.username == this.formParams.username
      && user.password == this.formParams.password)[0];
      console.log("loginDetail "+loginDetail);
    if(loginDetail){
      this.valid = true;
      //this.isLoggedIn = true;
      sessionStorage.setItem('username', this.formParams.username);
      this.router.navigate(['/products']);
      //sessionStorage.setItem('isLoggedIn', this.isLoggedIn);
    }
    else{
      this.valid = false;
      this.errorMessage = "Invalid Credentials. Please try again!!";
    }

  }

}
