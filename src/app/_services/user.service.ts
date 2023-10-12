import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthService } from './user-auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  PATH_OF_API = environment.apiUrl;

  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });
  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public register(registerData) {
    return this.httpclient.post(this.PATH_OF_API + '/registerNewUser', registerData, {
      headers: this.requestHeader,
    });
  }

  public registerAsRestaurant(registerData){
    return this.httpclient.post(this.PATH_OF_API + '/registerNewRestaurant', registerData, {
      headers: this.requestHeader,
    });
  }

  public login(loginData) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, {
      headers: this.requestHeader,
    });
  }

  public forUser() {
    return this.httpclient.get(this.PATH_OF_API + '/forUser');
  }

  public updateDetails(userDetails){
    return this.httpclient.post(this.PATH_OF_API+'/updateDetails',userDetails);
  }


  public forAdmin() {
    return this.httpclient.get(this.PATH_OF_API + '/forAdmin');
  }

  public forRestaurant(){
    return this.httpclient.get(this.PATH_OF_API + '/forRestaurant')
  }

  public roleMatch(allowedRoles): boolean {
    console.log(allowedRoles);
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();
    console.log(userRoles);


    //////////////////////////////////////////* from here Original code *////////////////////////////


    // if (userRoles != null && userRoles) {
    //   for (let i = 0; i < userRoles.length; i++) {
    //     for (let j = 0; j < allowedRoles.length; j++) {
    //       console.log(userRoles[i].roleName);
    //       console.log(allowedRoles[j]);
    //       if (userRoles[i].roleName === allowedRoles[j]) {
    //         isMatch = true;
    //         console.log(isMatch);
    //         return isMatch;
    //       } else {
    //         console.log(isMatch);
    //         return isMatch;
            
    //       }
    //     }
    //   }
    // }
    ///////////////////////******************** till here Original code *///////////////////////////////


    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          console.log(userRoles[i].roleName);
          console.log(allowedRoles[j]);
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch=true;
            console.log(isMatch);
            return isMatch;
          }
        }
      }
    }
    console.log(isMatch);
    return isMatch;
    
  }
}
