import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {

  userName:"";
  emailId:"";
  phoneNumber:"";
  name;

  isEditing: boolean = false;
  
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.forRestaurant();
  }


  forRestaurant(){
    this.userService.forRestaurant().subscribe(
      (response:any)=>{
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
