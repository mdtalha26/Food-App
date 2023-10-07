import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Menu } from '../_model/menu.model';
import { Restaurant } from '../_model/restaurant.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private httpClient:HttpClient) { }

  public addMenuToRestaurant(restaurantId:number,menu:Menu){
    return this.httpClient.post<Restaurant>(environment.apiUrl+"/restaurants/myRestaurants/"+restaurantId+"/menus",menu);
  }

  public getRestaurantMenus(restaurantId){
    return this.httpClient.get<Menu[]>(environment.apiUrl+"/restaurants/myRestaurants/"+restaurantId+"/menus");
  }

  public deleteMenuFromRestaurant(menuId){
    return this.httpClient.delete(environment.apiUrl+"/menus/"+menuId);
  }

  public getMenuById(menuId){
    return this.httpClient.get<Menu>(environment.apiUrl+"/menus/"+menuId);
  }

  public updateMenu(menuId:number,menu:Menu){
    return this.httpClient.put<Menu>(environment.apiUrl+"/menus/"+menuId,menu);
  }


}
