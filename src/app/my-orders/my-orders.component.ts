import { Component, OnInit } from '@angular/core';
import { MyOrderDetails } from '../_model/order.model';
import { ProductService } from '../_services/product.service';
import { FoodItemService } from '../_services/food-item.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {

  pageNumber: number = 0;
  showLoadButton = false;

  displayedColumns = ["Order Id","Name", "Address","FoodItem", "Contact No.", "Amount", "Status"];

  myOrderDetails: MyOrderDetails[] = [];

  constructor(private foodItemService: FoodItemService) { }

  ngOnInit(): void {
    this.getOrderDetails();
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.myOrderDetails = [];
    this.getOrderDetails(searchkeyword);
  }

  getOrderDetails(searchKey: string = "") {
    this.foodItemService.getMyOrders(this.pageNumber,searchKey).subscribe(
      (resp: MyOrderDetails[]) => {
        console.log(resp);
        this.myOrderDetails = this.myOrderDetails.concat(resp);
        if(resp.length == 12) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
      }, (err)=> {
        console.log(err);
      }
    );
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getOrderDetails();
  }

}
