import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.css']
})
export class RestaurantComponent implements OnInit {


  message;
  constructor(private userService:UserService) { }

  ngOnInit(): void {
    this.forRestaurant();
  }


  forRestaurant(){
    this.userService.forRestaurant().subscribe(
      (response:any)=>{
        const frstName=response.userFirstName;
        const lstName=response.userLastName;
        this.message=frstName+" "+lstName;
        // console.log(Response);
        // this.message=Response
      },
      (error)=>{
        console.log(error);
      }
    );
  }
}
