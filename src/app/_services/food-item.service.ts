import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodItem } from '../_model/fooditem.model';
import { Menu } from '../_model/menu.model';
import { OrderDetails } from '../_model/order-details.model';
import { Observable } from 'rxjs';
import { MyOrderDetails } from '../_model/order.model';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {

  constructor(private httpClient:HttpClient) { }

  public addFoodItemsToMenu(menuId:number,foodItem:FormData){
    return this.httpClient.post<FoodItem>("http://localhost:9090/menus/"+ menuId +"/addNewFoodItem",foodItem);
  }

  public getAllFoodItem(menuId){
    return this.httpClient.get<FoodItem[]>("http://localhost:9090/menus/"+menuId+"/fooditems");
  }

  ////////////////////////////////////////////////trial code here

  public getAllFoodItemsInMenu(menuId,pageNumber, searchKeyword: string = "") {
    return this.httpClient.get<FoodItem[]>("http://localhost:9090/menus/"+menuId+"/foodItemInMenu?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  ////////////////////////////////////////////////// till here

  public deleteFoodItem(foodItemId){
    return this.httpClient.delete("http://localhost:9090/deleteFoodItemDetails/"+foodItemId);
  }

  getFoodItemById(foodItemId){
    return this.httpClient.get<FoodItem>("http://localhost:9090/getFoodItemDetailsById/"+foodItemId);
  }

  updateFoodItem(foodItem:FormData){
    return this.httpClient.post<FoodItem>("http://localhost:9090/addNewFoodItem",foodItem);
  }

  public getAllFoodItems(pageNumber, searchKeyword: string = "", category:string="") {
    return this.httpClient.get<FoodItem[]>("http://localhost:9090/getAllFoodItems?pageNumber="+pageNumber+"&searchKey="+searchKeyword+"&category="+category);
  }

  public addToCart(foodItemId) {
    return this.httpClient.get("http://localhost:9090/addToCart/"+foodItemId);
  }

  public getFoodItemDetails(isSingleProductCheckout, foodItemId) {
    return this.httpClient.get<FoodItem[]>("http://localhost:9090/getFoodItemDetails/"+isSingleProductCheckout+"/"+foodItemId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout) {
    return this.httpClient.post("http://localhost:9090/placeOrder/"+isCartCheckout, orderDetails);
  }

  public createTransaction(amount) {
    return this.httpClient.get("http://localhost:9090/createTransaction/"+amount);
  }

  public getCartDetails() {
    return this.httpClient.get("http://localhost:9090/getCartDetails");
  }

  public deleteCartItem(cartId) {
    return this.httpClient.delete("http://localhost:9090/deleteCartItem/"+cartId);
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getOrderDetails");
  }

  public getRestaurantOrders(status:string,sort:String,pageNumber, searchKeyword: string = ""): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getRestaurantOrderDetails/"+status+"/"+sort+"?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getAllOrderDetailsForAdmin(status: string,sort:String,pageNumber, searchKeyword: string = ""): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>("http://localhost:9090/getAllOrderDetails/"+status+"/"+sort+"?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public markAsDelivered(orderId) {
    return this.httpClient.get("http://localhost:9090/markOrderAsDelivered/"+orderId)
}
}
