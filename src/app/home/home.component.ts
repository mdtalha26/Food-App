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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  pageNumber: number = 0;

  foodItemDetails = [];

  showLoadButton = false;

  constructor(private productService: ProductService,
    private foodItemService:FoodItemService,
    private foodItemImgProcessingService:FoodItemImageProcessingService,
    private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getAllFoodItems();
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.foodItemDetails = [];
    this.getAllFoodItems(searchkeyword);
  }

  public getAllFoodItems(searchKey: string = "") {
    this.foodItemService.getAllFoodItems(this.pageNumber, searchKey)
    .pipe(
      map((x: FoodItem[], i) => x.map((foodItem: FoodItem) => this.foodItemImgProcessingService.createImages(foodItem)))
    )
    .subscribe(
      (resp: FoodItem[]) => {
        console.log(resp);
        if(resp.length == 12) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        resp.forEach(p => this.foodItemDetails.push(p));
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllFoodItems();
  }

  showFoodItemDetails(foodItemId) {
    this.router.navigate(['/viewFoodItemDetails', {foodItemId: foodItemId}]);
  }
}
