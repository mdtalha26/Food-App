import { Component, OnInit } from '@angular/core';
import { FoodItem } from '../_model/fooditem.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../_services/food-item.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-view-food-item-details',
  templateUrl: './view-food-item-details.component.html',
  styleUrls: ['./view-food-item-details.component.css']
})
export class ViewFoodItemDetailsComponent implements OnInit {

  selectedFoodItemIndex = 0;

  foodItem: FoodItem;

  constructor(private activatedRoute: ActivatedRoute,
    private router: Router,
    public dialog:MatDialog,
    private foodItemService: FoodItemService) { }

  ngOnInit(): void {
    this.foodItem = this.activatedRoute.snapshot.data['foodItem'];
    console.log(this.foodItem)
  }

  addToCart(foodItemId) {
    this.foodItemService.addToCart(foodItemId).subscribe(
      (response) => {
        this.openErrorDialog('Success', 'Added to cart Successfully');
        console.log(response);
      }, (error)=> {
        this.openErrorDialog('Error', 'Something went wrong');
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
}
