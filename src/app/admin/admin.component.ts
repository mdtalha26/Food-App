import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  userName:"";
  emailId:"";
  phoneNumber:"";
  name;
  isEditing: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.forUser();
  }

  forUser() {
    this.userService.forAdmin().subscribe(
      (response:any) => {
        console.log(response);
        this.userName=response.userName;
        const frstName=response.userFirstName;
        const lstName=response.userLastName;
        this.name=frstName+" "+lstName; 
        this.emailId=response.emailId;
        this.phoneNumber=response.phoneNumber;
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

}
