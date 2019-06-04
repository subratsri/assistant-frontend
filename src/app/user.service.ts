import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData: any={
    "user_email":"",
    "user_fname":"",
    "user_mname":"",
    "user_lname":"",
    "user_birthdate":"",
    "user_dlocation":"",
    "user_slocation":"",
    "user_clocation":"",
    "user_access":"",
    "sessionid": 0
  };
  
  injectData(userData){
    this.userData = userData;
  }
  constructor() { }
}
