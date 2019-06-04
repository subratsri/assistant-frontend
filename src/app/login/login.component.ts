import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private svc: UserService, private http: HttpClient, private router: Router) { }

  loginMail: String;
  loginPass: String;
  loginData: any={};
  userData: any={};
  signup(){
    this.router.navigateByUrl('/newuser/signup');
  }
  login(){
    this.loginData={
      "userEmail":this.loginMail,
      "userPassword":this.loginPass
    }
    let obs = this.http.post("http://localhost:8080/AssistantFinal/assistant/user/login", this.loginData)
    .subscribe((response)=>{
      this.svc.injectData(response);
      console.log(this.svc.userData.sessionid);
      if(this.svc.userData.sessionid==0){
        alert("Access not granted");
        this.router.navigateByUrl('/login');
      }
      else{
        this.router.navigateByUrl('/search');
      }
    })
  }
  ngOnInit() {
  }

}
