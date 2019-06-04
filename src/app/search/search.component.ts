import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  searchClicked : boolean = false;
  boxCounter: number = 0;
  nom: number=0;
  boxObject: any= {
    boxNumber: [
    ]
  };
  boxResponse: any={
    responseText:[
    ]
  };
  dim2: String[][];
  i: number;
  j: number;
  k: number;
  l: number;
  inputQuery: string="";
  queryHandle: string;
  output: String; 
  result: String;
  flag: boolean = false;
  flag2: boolean = false;
  sessionId: any;
  response: any;
  api: String="";

  constructor(private svc: UserService, private http: HttpClient, private router: Router) { 

  }
  
  search(){
    if(this.svc.userData.sessionid==0){
      alert("Please login");
      this.flag2 = true;
      this.router.navigateByUrl('/login');
    }
    this.nom = this.inputQuery.length;
    if(this.nom!=0){
      this.sessionId={
        "session_id": this.svc.userData.sessionid
      }
      let obs = this.http.post("http://localhost:8080/AssistantFinal/assistant/user/search?query="+this.inputQuery, this.sessionId)
      .subscribe((response)=>{
        this.response = response;
        console.log(response);
        if(this.response.type=="API"){
        let obs2 = this.http.get(this.response.response, { responseType: 'text' })
        .subscribe(
          (response2)=>{
            if(response2.includes("<plaintext>")){
              this.i = response2.indexOf("<plaintext>");
              this.j = response2.indexOf("</plaintext>");
              this.k = response2.indexOf("<plaintext>", this.j);
              this.l = response2.indexOf("</plaintext>", this.k);
              this.output = response2.slice(this.k+11, this.l);
              //Test
              this.boxObject.boxNumber.unshift(this.inputQuery+" : "+this.output);
              //
              this.searchClicked = true;
            }
          }
        )
      }
      else if(this.response.type=="SELF"){
        this.boxObject.boxNumber.unshift(this.inputQuery+" : "+this.response.response);
        this.searchClicked = true;
      }
      })
    }  
    if(this.nom==0 && !this.flag2){
      this.flag = true;
      alert("Please enter a query");
    }
    this.boxCounter++;
    this.queryHandle = this.inputQuery;
    console.log(this.boxCounter);
  }
  
  ngOnInit() {

  }

}
