import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../_services/restaurant.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Restaurant } from '../_model/restaurant.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewRestaurantDocumentsDialogComponent } from '../view-restaurant-documents-dialog/view-restaurant-documents-dialog.component';
import { ImageProcessingService } from '../image-processing.service';
import { RestDocImgProcessingService } from '../rest-doc-img-processing.service';
import { map } from 'rxjs/operators';
import { UserAuthService } from '../_services/user-auth.service';

@Component({
  selector: 'app-view-all-restaurants',
  templateUrl: './view-all-restaurants.component.html',
  styleUrls: ['./view-all-restaurants.component.css']
})
export class ViewAllRestaurantsComponent implements OnInit {

  pageNumber: number = 0;

  showLoadButton = false;

  restaurantDetails:Restaurant[]=[];

  displayedColumns: string[] = ['Restaurant Name','Restaurant Address', 'Restaurant Owner','Documents','Delete','View Restaurant'];
  constructor(private restaurantService: RestaurantService,
              private userAuthService: UserAuthService,
              public documentImagesDialog:MatDialog,
              private restDocImgProcessingService:RestDocImgProcessingService,
              private router:Router) { }

  ngOnInit(): void {
    if (this.isUser()) {
      const index = this.displayedColumns.indexOf('Restaurant Owner');
      if (index !== -1) {
        this.displayedColumns.splice(index, 3);
      }
      
    }
    this.getAllRestaurantsPage();
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.restaurantDetails = [];
    this.getAllRestaurantsPage(searchkeyword);
  }


  public getAllRestaurantsPage(searchKey: string = "") {
    this.restaurantService.getAllRestaurantsPage(this.pageNumber, searchKey)
    .pipe(
      map((x: Restaurant[], i) => x.map((restaurant: Restaurant) => this.restDocImgProcessingService.createImages(restaurant)))
    )
    .subscribe(
      (resp: Restaurant[]) => {
        console.log(resp);
        if(resp.length == 12) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        this.restaurantDetails=resp;
        // resp.forEach(p => this.restaurantDetails.push(p));
      }, (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getAllRestaurantsPage();
  }

  // public getAllRestaurants(){
  //   this.restaurantService.getAllRestaurants()
  //   .pipe(
  //     map((x:Restaurant[],i)=>x.map((restaurant:Restaurant)=>this.restDocImgProcessingService.createImages(restaurant)))
  //   )
  //   .subscribe(
  //     (resp:Restaurant[])=>{
  //     console.log(resp);
  //     this.restaurantDetails=resp;
  //     },(error:HttpErrorResponse)=>{
  //       console.log(error);
  //     }
  //   )
  // }

  deleteRestaurant(restaurantId){
    this.restaurantService.deleteRestaurant(restaurantId).subscribe(
      (resp)=>{
        this.getAllRestaurantsPage();
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  viewRestaurantDocuments(restaurant: Restaurant){
    console.log(restaurant);
    this.documentImagesDialog.open(ViewRestaurantDocumentsDialogComponent, {
      data:{
        images:restaurant.documents
      },
      height:'500px',
      width:'800px'
    });
  }

  viewRestaurant(restaurantId){
    this.router.navigate(["/viewRestaurantMenus",{restaurantId:restaurantId}]);
  }

  editRestaurant(restaurantId){
    this.router.navigate(["/createRestaurant",{restaurantId:restaurantId}]);
  }

  public isRestaurant(){
    return this.userAuthService.isRestaurant();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

}
