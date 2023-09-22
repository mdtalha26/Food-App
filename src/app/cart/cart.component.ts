import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../_services/product.service';
import { FoodItemService } from '../_services/food-item.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  flag:Boolean=false;

  displayedColumns: string[] = ['Name', 'Description', 'Price', 'Action'];

  cartDetails: any[] = [];

  constructor(private foodItemService: FoodItemService,
    public dialog:MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getCartDetails();
  }

  delete(cartId) {
    console.log(cartId);
    this.foodItemService.deleteCartItem(cartId).subscribe(
      (resp) => {
        console.log(resp);
        this.flag=false;
        this.openErrorDialog('Success', 'Cart Item deleted Successfully');
        this.getCartDetails();
      }, (err) => {
        this.openErrorDialog('Error', 'Something went wrong. Please try again');
        console.log(err);
      }
    );
  }

  getCartDetails() {
    this.foodItemService.getCartDetails().subscribe(
      (response:any[]) => {

        console.log(response);
        this.cartDetails = response;
        if(response.length>0){
          this.flag=true;
          }
      },
      (error) => {
        console.log(error);
      }
    );
  }

  checkout() {
    
    this.router.navigate(['/buyFoodItem', {
      isSingleProductCheckout: false, id: 0
    }]);

    // this.productService.getProductDetails(false, 0).subscribe(
    //   (resp) => {
    //     console.log(resp);
    //   }, (err) => {
    //     console.log(err);
    //   }
    // );
  }

  public isCartItemPresent(){
    return this.flag;
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
