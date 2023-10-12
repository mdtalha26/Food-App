import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { FoodItemService } from '../_services/food-item.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userName:"";
  emailId:"";
  phoneNumber:"";
  name;

  userData = {
    userName: '',
    userPhone: '',
  };

  isEditing: boolean = false;
  constructor(private userService: UserService,
              private foodItemService:FoodItemService) { }

  ngOnInit(): void {
    this.forUser();
    this.foodItemService.getCartCount();
  }

  forUser() {
    this.userService.forUser().subscribe(
      (response:any) => {
        console.log(response);
        this.userName=response.userName;
        const frstName=response.userFirstName;
        const lstName=response.userLastName;
        this.name=frstName+" "+lstName; 
        this.emailId=response.emailId;
        this.phoneNumber=response.phoneNumber;
        this.userData.userName=response.userName;
        this.userData.userPhone=response.phoneNumber;
        console.log(this.userData);
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }

  updateDetails(){
    this.userService.updateDetails(this.userData).subscribe(
      (resp:any)=>{
        console.log(resp);
      },
      (error)=>{
        console.log(error);
      }
    );
  }


}
