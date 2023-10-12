import { Component, Injector, NgZone, OnInit } from '@angular/core';
import { FoodItem } from '../_model/fooditem.model';
import { OrderDetails } from '../_model/order-details.model';

import { ActivatedRoute, Router } from '@angular/router';
import { FoodItemService } from '../_services/food-item.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { UserService } from '../_services/user.service';

declare var Razorpay: any;
@Component({
  selector: 'app-buy-food-item',
  templateUrl: './buy-food-item.component.html',
  styleUrls: ['./buy-food-item.component.css']
})
export class BuyFoodItemComponent implements OnInit {

  isDisabled: boolean = true;
  isSingleProductCheckout: string = '';
  foodItemDetails: FoodItem[] = [] ;

  orderDetails: OrderDetails = {
    fullName: '',
    fullAddress: '',
    contactNumber: '',
    alternateContactNumber: '',
    transactionId: '',
    orderFoodItemQuantityList: []
  }

  constructor(private activatedRoute: ActivatedRoute,
    private foodItemService: FoodItemService,
    private userService:UserService,
    private router: Router,
    private injector: Injector,
    public dialog:MatDialog) { }

  ngOnInit(): void {
    this.foodItemDetails = this.activatedRoute.snapshot.data['foodItemDetails'];
    this.isSingleProductCheckout = this.activatedRoute.snapshot.paramMap.get("isSingleProductCheckout");
    
    this.foodItemDetails.forEach(
      x => this.orderDetails.orderFoodItemQuantityList.push(
        {foodItemId: x.foodItemId, quantity: 1}
      )
    );

    this.getUserDetails();

    console.log(this.foodItemDetails)
    console.log(this.orderDetails);
  }

  public placeOrder(orderForm: NgForm) {
    this.foodItemService.placeOrder(this.orderDetails, this.isSingleProductCheckout).subscribe(
      (resp) => {
        console.log(resp);
        orderForm.reset();
        this.openErrorDialog('Success', 'Order Placed Successfully');

        const ngZone = this.injector.get(NgZone);
        ngZone.run(
          () => {
            this.router.navigate(["/orderConfirm"]);
          }
        );
      },
      (err) => {
        this.openErrorDialog('Error', 'Order Failed');
        console.log(err);
      }
    );
  }

  getUserDetails(){
    this.userService.forUser().subscribe(
      (response:any) => {
        console.log(response);
        const frstName=response.userFirstName;
        const lstName=response.userLastName;
        this.orderDetails.fullName=frstName+" "+lstName; 
        this.orderDetails.contactNumber=response.phoneNumber;
        this.orderDetails.fullAddress=response.userAddress;
      }, 
      (error)=>{
        console.log(error);
      }
    );
  }


  getQuantityForFoodItem(foodItemId) {
    const filteredFoodItem = this.orderDetails.orderFoodItemQuantityList.filter(
      (foodItemQuantity) => foodItemQuantity.foodItemId === foodItemId
    );

    return filteredFoodItem[0].quantity;
  }

  getCalculatedTotal(foodItemId, foodItemPrice) {
    const filteredFoodItem = this.orderDetails.orderFoodItemQuantityList.filter(
      (foodItemQuantity) => foodItemQuantity.foodItemId === foodItemId
    );

    return filteredFoodItem[0].quantity * foodItemPrice;
  }

  onQuantityChanged(q, foodItemId) {
    this.orderDetails.orderFoodItemQuantityList.filter(
      (orderFoodItem) => orderFoodItem.foodItemId === foodItemId
    )[0].quantity = q;
  }

  getCalculatedGrandTotal() {
    let grandTotal = 0;

    this.orderDetails.orderFoodItemQuantityList.forEach(
      (foodItemQuantity) => {
        const price = this.foodItemDetails.filter(foodItem => foodItem.foodItemId === foodItemQuantity.foodItemId)[0].foodItemPrice;
        grandTotal = grandTotal + price * foodItemQuantity.quantity;
      }
    );

    return grandTotal;
  }

  createTransactionAndPlaceOrder(orderForm: NgForm) {
    let amount = this.getCalculatedGrandTotal();
    this.foodItemService.createTransaction(amount).subscribe(
      (response) => {
        console.log(response);
        this.openTransactioModal(response, orderForm);
      },
      (error) => {
        console.log(error);
      }
    );

  }

  openTransactioModal(response: any, orderForm: NgForm) {
    var options = {
      order_id: response.orderId,
      key: response.key,
      amount: response.amount,
      currency: response.currency,
      name: 'Talha',
      description: 'Payment of online shopping',
      image: 'https://cdn.pixabay.com/photo/2023/01/22/13/46/swans-7736415_640.jpg',
      handler: (response: any) => {
        if(response!= null && response.razorpay_payment_id != null) {
          this.processResponse(response, orderForm);
        } else {
          alert("Payment failed..")
        }
       
      },
      prefill : {
        name:'Talha',
        email: 'MYNAMEISMOHAMMEDTALHA@GMAIL.COM',
        contact: '7236427492'
      },
      notes: {
        address: 'Online Shopping'
      },
      theme: {
        color: '#F37254'
      }
    };

    var razorPayObject = new Razorpay(options);
    razorPayObject.open();
  }

  processResponse(resp: any, orderForm:NgForm) {
    this.orderDetails.transactionId = resp.razorpay_payment_id;
    this.placeOrder(orderForm);
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
