import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../_model/fooditem.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../_services/food-item.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { UserAuthService } from '../_services/user-auth.service';
import { Restaurant } from '../_model/restaurant.model';

@Component({
  selector: 'app-view-food-item-details',
  templateUrl: './view-food-item-details.component.html',
  styleUrls: ['./view-food-item-details.component.css']
})
export class ViewFoodItemDetailsComponent implements OnInit {

  selectedFoodItemIndex = 0;
  restaurant:Restaurant;

  foodItem: FoodItem;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog:MatDialog,
    private foodItemService: FoodItemService,
    private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.foodItem = this.activatedRoute.snapshot.data['foodItem'];
    this.restaurant=this.activatedRoute.snapshot.data['restaurant'];
    console.log(this.foodItem);
    console.log(this.restaurant);
  }

  addToCart(foodItemId) {
    this.foodItemService.addToCart(foodItemId).subscribe(
      (response) => {
        this.openErrorDialog('Success', 'Added to cart Successfully');
        this.foodItemService.getCartCount();
        console.log(response);
      }, (error)=> {
        this.openErrorDialog('Alert', error.error);
        console.log(error);
      }
    );
  }

  changeIndex(index) {
    this.selectedFoodItemIndex = index;
  }

  buyFoodItem(foodItemId) {
    this.router.navigate(['/buyFoodItem', {
      isSingleProductCheckout: true, id: foodItemId
    }]);
  }

  openErrorDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }

  onBack(){
    this.router.navigate(["/viewRestaurantMenus",{restaurantId:this.restaurant.restaurantId}]);
  }

  isUser(){
    return this.userAuthService.isUser();
  }
}
