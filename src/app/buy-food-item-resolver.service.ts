import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { FoodItem } from './_model/fooditem.model';
import { FoodItemService } from './_services/food-item.service';
import { FoodItemImageProcessingService } from './food-item-image-processing.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BuyFoodItemResolverService implements Resolve<FoodItem[]>{

  // let isSingleProductCheckout = false;

  constructor(private foodItemServcice: FoodItemService,
    private foodItemImgProcessingService: FoodItemImageProcessingService) { 

    }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): FoodItem[] | Observable<FoodItem[]> | Promise<FoodItem[]> {
    
    const id = route.paramMap.get("id");
    const isSingleProductCheckout = route.paramMap.get("isSingleProductCheckout");
    return this.foodItemServcice.getFoodItemDetails(isSingleProductCheckout, id)
      .pipe(
        map(
          (x: FoodItem[], i) => x.map((foodItem: FoodItem) => this.foodItemImgProcessingService.createImages(foodItem))
        )
      );
  }
}
