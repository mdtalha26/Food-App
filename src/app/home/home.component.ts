import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ImageProcessingService } from '../image-processing.service';
import { Product } from '../_model/product.model';
import { ProductService } from '../_services/product.service';
import { FoodItemService } from '../_services/food-item.service';
import { FoodItem } from '../_model/fooditem.model';
import { FoodItemImageProcessingService } from '../food-item-image-processing.service';
import { RestaurantService } from '../_services/restaurant.service';
import { Restaurant } from '../_model/restaurant.model';
import { RestDocImgProcessingService } from '../rest-doc-img-processing.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber: number = 0;

  restaurantDetails=[];

  foodItemDetails = [];

  showLoadButton = false;

  constructor(private productService: ProductService,
    private foodItemService:FoodItemService,
    private restaurantService:RestaurantService,
    private foodItemImgProcessingService:FoodItemImageProcessingService,
    private restDocImgProcessingService: RestDocImgProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    // this.getAllFoodItems();
    this.getAllRestaurants();
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.restaurantDetails = [];
    this.getAllRestaurants(searchkeyword);
  }

  // searchByCategory(category) {
  //   this.pageNumber = 0;
  //   this.foodItemDetails = [];
  //   this.getAllFoodItems(null,category);
  // }

  // public getAllFoodItems(searchKey: string = "",category:string="") {
  //   this.foodItemService.getAllFoodItems(this.pageNumber, searchKey,category)
  //   .pipe(
  //     map((x: FoodItem[], i) => x.map((foodItem: FoodItem) => this.foodItemImgProcessingService.createImages(foodItem)))
  //   )
  //   .subscribe(
  //     (resp: FoodItem[]) => {
  //       console.log(resp);
  //       if(resp.length == 12) {
  //         this.showLoadButton = true;
  //       } else {
  //         this.showLoadButton = false;
  //       }
  //       resp.forEach(p => this.foodItemDetails.push(p));
  //     }, (error: HttpErrorResponse) => {
  //       console.log(error);
  //     }
  //   );
  // }

  public getAllRestaurants(searchKey: string = "") {
    this.restaurantService.getAllRestaurantsPage(this.pageNumber, searchKey)
    .pipe(
      map((x: Restaurant[], i) => x.map((restaurant: Restaurant) => this.restDocImgProcessingService.createImages(restaurant)))
    )
    .subscribe(
      (resp: Restaurant[]) => {
        console.log(resp);
        if(resp.length == 12) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        resp.forEach(p => this.restaurantDetails.push(p));
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public getAllRestaurantsForDish(searchKey: string = "") {
    this.foodItemService.getAllRestForDish(this.pageNumber, searchKey)
    .pipe(
      map((x: Restaurant[], i) => x.map((restaurant: Restaurant) => this.restDocImgProcessingService.createImages(restaurant)))
    )
    .subscribe(
      (resp: Restaurant[]) => {
        this.restaurantDetails=[];
        console.log(resp);
        if(resp.length == 12) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        resp.forEach(p => this.restaurantDetails.push(p));
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  viewRestaurant(restaurantId) {
    this.router.navigate(["/viewRestaurantMenus",{restaurantId:restaurantId}]);
  }

  public reloadPage(){
    location.reload();
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllRestaurants();
  }

  // showFoodItemDetails(foodItemId) {
  //   this.router.navigate(['/viewFoodItemDetails', {foodItemId: foodItemId}]);
  // }
}
