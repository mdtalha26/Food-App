import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Restaurant } from '../_model/restaurant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestaurantService {

  constructor(private httpClient:HttpClient) { }

  public createRestaurant(restaurant:FormData){
    return this.httpClient.post<Restaurant>(environment.apiUrl+"/restaurants",restaurant);
  }

  public verifyRestaurant(restaurantId:any){
    return this.httpClient.get<Restaurant>(environment.apiUrl+"/restaurants/verifyRestaurant/"+restaurantId);
  }

  public getAllRestaurantsForAdmin(pageNumber, searchKeyword: string = ""){
    return this.httpClient.get<Restaurant[]>(environment.apiUrl+"/restaurants/forAdmin?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getAllRestaurantsPage(pageNumber, searchKeyword: string = "") {
    return this.httpClient.get<Restaurant[]>(environment.apiUrl+"/restaurants?pageNumber="+pageNumber+"&searchKey="+searchKeyword);
  }

  public getMyRestaurants(){
    return this.httpClient.get<Restaurant[]>(environment.apiUrl+"/restaurants/myRestaurants");
  }

  public deleteRestaurant(restaurantId:number){
    return this.httpClient.delete(environment.apiUrl+"/restaurants/"+restaurantId);
  }

  public getRestaurantById(restaurantId:any){
    return this.httpClient.get(environment.apiUrl+"/restaurants/"+restaurantId);
  }
}
