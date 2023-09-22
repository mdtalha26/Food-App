import { Component, OnInit } from '@angular/core';
import { ProductService } from '../_services/product.service';
import { FoodItemService } from '../_services/food-item.service';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {

  pageNumber: number = 0;

  showLoadButton = false;

  displayedColumns: string[] = ['FoodItem Name', 'Name', 'Address', 'Contact No.','Date and Time', 'Status', 'Action'];
  dataSource = [];
  flag:Boolean=false;
  sortDirection: string = 'Asc';

  status: string = 'All';
  isRestaurantFlag:boolean =false;

  constructor(private foodItemService: FoodItemService,
              private userAuthService: UserAuthService,) { }

  ngOnInit(): void {
    this.isRestaurant();
    this.getAllOrderDetailsForAdmin(this.status);
  }


  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.dataSource = [];
    this.getAllOrderDetailsForAdmin(this.status,searchkeyword);
  }

  getAllOrderDetailsForAdmin(statusParameter: string,searchKey: string = "") {
    if(this.isRestaurantFlag==false){
      console.log("this is admin 1");
    this.foodItemService.getAllOrderDetailsForAdmin(statusParameter,this.sortDirection,this.pageNumber,searchKey).subscribe(
      (resp) => {
        if(resp.length>0){
          this.flag=true;
        }
        console.log("this is admin 2");
        this.dataSource = resp;
        console.log(resp);
        if(resp.length == 12) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
      }, (error) => {
        console.log(error);
      }
    );
    }else if(this.isRestaurantFlag==true){
      console.log("Toggle is "+this.sortDirection);

      this.foodItemService.getRestaurantOrders(statusParameter,this.sortDirection,this.pageNumber,searchKey).subscribe(
        (resp) => {
          if(resp.length>0){
            this.flag=true;
          }
          console.log("this is Rest 2");
          this.dataSource = resp;
          console.log(resp);
          if(resp.length == 12) {
            this.showLoadButton = true;
          } else {
            this.showLoadButton = false;
          }
        }, (error) => {
          console.log(error);
        }
      );
    }
  }

  markAsDelivered(orderId) {
    console.log(orderId);
    this.foodItemService.markAsDelivered(orderId).subscribe(
      (response) => {
        this.getAllOrderDetailsForAdmin(this.status,this.sortDirection);
        console.log(response);
      }, (error) => {
        console.log(error);
      }
    );
  }

  
  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isRestaurant(){
     this.isRestaurantFlag=this.userAuthService.isRestaurant();
    //  console.log(this.isRestaurantFlag);
    //  console.log("Flag works")
  }

  public isOrderPresent(){
    return this.flag;
  }

  toggleSort() {
    this.sortDirection = this.sortDirection === 'Asc' ? 'Desc' : 'Asc';
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllOrderDetailsForAdmin(this.status);
  }

}
