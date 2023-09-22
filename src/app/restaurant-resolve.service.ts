import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ProductService } from './_services/product.service';
import { ImageProcessingService } from './image-processing.service'
import { map } from 'rxjs/operators';
import { Restaurant } from './_model/restaurant.model';
import { RestaurantService } from './_services/restaurant.service';
import { RestDocImgProcessingService } from './rest-doc-img-processing.service';

@Injectable({
  providedIn: "root",
})
export class RestaurantResolveService implements Resolve<Restaurant> {
  constructor(private restaurantService: RestaurantService,
    private restDocImgProcessingService: RestDocImgProcessingService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Restaurant> {
    const id = route.paramMap.get("restaurantId");

    if (id) {
      //then we have to fetch details from backend
       return this.restaurantService.getRestaurantById(id)
              .pipe(
                map((p: Restaurant) => this.restDocImgProcessingService.createImages(p))

              );
    } else {
      // return empty product observable.
      return of(this.getRestaurantDetails());
    }
  }

  getRestaurantDetails() {
    return {
      restaurantId:null,
      restaurantName:"",
      fssaiLicenseNumber:"",
      panCard:"",
      restaurantAddress:"",
      documents:[]
    };
  }
}