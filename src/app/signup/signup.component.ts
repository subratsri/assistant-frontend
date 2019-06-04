import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  email: String;
  fname: String;
  mname: String;
  lname: String;
  birthdate: String;
  dlocation: String;
  slocation: String;
  clocation: String;
  password: String;
  
  userData: any;
  constructor(private svc: UserService, private http: HttpClient, private router: Router) { }
  login(){
    this.router.navigateByUrl('/login');
  }
  singup(){
    this.userData={
      "user_email":this.email,
      "user_fname":this.fname,
      "user_mname":this.mname,
      "user_lname":this.lname,
      "user_birthdate":this.birthdate,
      "user_dlocation":this.dlocation,
      "user_slocation":this.slocation,
      "user_clocation":this.clocation,
      "user_access":1,
      "user_password":this.password
    }
    let obs = this.http.post("http://localhost:8080/AssistantFinal/assistant/newuser/signup", this.userData)
    .subscribe((response)=>{
        alert("Signed in successfully");
        alert("Please login to continue");
        this.router.navigateByUrl('/login');
    })
  }
  ngOnInit() {
  }

}
