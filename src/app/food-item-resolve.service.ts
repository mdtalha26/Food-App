import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FoodItemService } from './_services/food-item.service';
import { FoodItemImageProcessingService } from './food-item-image-processing.service';
import { FoodItem } from './_model/fooditem.model';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FoodItemResolveService implements Resolve<FoodItem> {
  constructor(private foodItemService: FoodItemService,
    private foodItemImgProcessingService: FoodItemImageProcessingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<FoodItem> {
    const menuId = route.paramMap.get("menuId");
    const foodItemId=route.paramMap.get("foodItemId")

    if (foodItemId) {
      //then we have to fetch details from backend
       return this.foodItemService.getFoodItemById(foodItemId)
              .pipe(
                map((p: FoodItem) => this.foodItemImgProcessingService.createImages(p))

              );
    } else {
      // return empty product observable.
      return of(this.getFoodItemDetails());
    }
  }

  getFoodItemDetails() {
    return {
      foodItemId:null,
      foodItemName:"",
      foodItemDescription:"",
      foodItemPrice:null,
      foodItemImages:[]
    };
  }
}
