import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../_model/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient:HttpClient) { }

  public createRestaurant(restaurant:FormData){
    return this.httpClient.post<Restaurant>("http://localhost:9090/restaurants",restaurant);
  }

  // public getAllRestaurants(){
  //   return this.httpClient.get<Restaurant[]>("http://localhost:9090/restaurants");
  // }

  public getAllRestaurantsPage(pageNumber, searchKeyword: string = "") {
    return this.httpClient.get<Restaurant[]>("http://localhost:9090/restaurants?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getMyRestaurants(){
    return this.httpClient.get<Restaurant[]>("http://localhost:9090/restaurants/myRestaurants");
  }

  public deleteRestaurant(restaurantId:number){
    return this.httpClient.delete("http://localhost:9090/restaurants/"+restaurantId);
  }

  public getRestaurantById(restaurantId:any){
    return this.httpClient.get("http://localhost:9090/restaurants/"+restaurantId);
  }
}
