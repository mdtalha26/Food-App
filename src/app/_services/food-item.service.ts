import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FoodItem } from '../_model/fooditem.model';
import { Menu } from '../_model/menu.model';
import { OrderDetails } from '../_model/order-details.model';
import { Observable } from 'rxjs';
import { MyOrderDetails } from '../_model/order.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FoodItemService {

  constructor(private httpClient:HttpClient) { }

  public addFoodItemsToMenu(menuId:number,foodItem:FormData){
    return this.httpClient.post<FoodItem>(environment.apiUrl+"/menus/"+ menuId +"/addNewFoodItem",foodItem);
  }

  public getAllFoodItem(menuId){
    return this.httpClient.get<FoodItem[]>(environment.apiUrl+"/menus/"+menuId+"/fooditems");
  }

  ////////////////////////////////////////////////trial code here

  public getAllFoodItemsInMenu(menuId,pageNumber, searchKeyword: string = "") {
    return this.httpClient.get<FoodItem[]>(environment.apiUrl+"/menus/"+menuId+"/foodItemInMenu?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  ////////////////////////////////////////////////// till here

  public deleteFoodItem(foodItemId){
    return this.httpClient.delete(environment.apiUrl+"/deleteFoodItemDetails/"+foodItemId);
  }

  getFoodItemById(foodItemId){
    return this.httpClient.get<FoodItem>(environment.apiUrl+"/getFoodItemDetailsById/"+foodItemId);
  }

  updateFoodItem(foodItem:FormData){
    return this.httpClient.post<FoodItem>(environment.apiUrl+"/addNewFoodItem",foodItem);
  }

  public getAllFoodItems(pageNumber, searchKeyword: string = "", category:string="") {
    return this.httpClient.get<FoodItem[]>(environment.apiUrl+"/getAllFoodItems?pageNumber="+pageNumber+"&searchKey="+searchKeyword+"&category="+category);
  }

  public addToCart(foodItemId) {
    return this.httpClient.get(environment.apiUrl+"/addToCart/"+foodItemId);
  }

  public getFoodItemDetails(isSingleProductCheckout, foodItemId) {
    return this.httpClient.get<FoodItem[]>(environment.apiUrl+"/getFoodItemDetails/"+isSingleProductCheckout+"/"+foodItemId);
  }

  public placeOrder(orderDetails: OrderDetails, isCartCheckout) {
    return this.httpClient.post(environment.apiUrl+"/placeOrder/"+isCartCheckout, orderDetails);
  }

  public createTransaction(amount) {
    return this.httpClient.get(environment.apiUrl+"/createTransaction/"+amount);
  }

  public getCartDetails() {
    return this.httpClient.get(environment.apiUrl+"/getCartDetails");
  }

  public deleteCartItem(cartId) {
    return this.httpClient.delete(environment.apiUrl+"/deleteCartItem/"+cartId);
  }

  public getMyOrders(): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>(environment.apiUrl+"/getOrderDetails");
  }

  public getRestaurantOrders(status:string,sort:String,pageNumber, searchKeyword: string = ""): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>(environment.apiUrl+"/getRestaurantOrderDetails/"+status+"/"+sort+"?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getAllOrderDetailsForAdmin(status: string,sort:String,pageNumber, searchKeyword: string = ""): Observable<MyOrderDetails[]> {
    return this.httpClient.get<MyOrderDetails[]>(environment.apiUrl+"/getAllOrderDetails/"+status+"/"+sort+"?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public markAsDelivered(orderId) {
    return this.httpClient.get(environment.apiUrl+"/markOrderAsDelivered/"+orderId)
}
}
