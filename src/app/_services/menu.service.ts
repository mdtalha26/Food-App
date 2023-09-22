import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../_model/menu.model';
import { Restaurant } from '../_model/restaurant.model';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient:HttpClient) { }

  public addMenuToRestaurant(restaurantId:number,menu:Menu){
    return this.httpClient.post<Restaurant>("http://localhost:9090/restaurants/myRestaurants/"+restaurantId+"/menus",menu);
  }

  public getRestaurantMenus(restaurantId){
    return this.httpClient.get<Menu[]>("http://localhost:9090/restaurants/myRestaurants/"+restaurantId+"/menus");
  }

  public deleteMenuFromRestaurant(menuId){
    return this.httpClient.delete("http://localhost:9090/menus/"+menuId);
  }

  public getMenuById(menuId){
    return this.httpClient.get<Menu>("http://localhost:9090/menus/"+menuId);
  }

  public updateMenu(menuId:number,menu:Menu){
    return this.httpClient.put<Menu>("http://localhost:9090/menus/"+menuId,menu);
  }


}
