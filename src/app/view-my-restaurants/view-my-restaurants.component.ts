import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../_services/restaurant.service';
import { Restaurant } from '../_model/restaurant.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewRestaurantDocumentsDialogComponent } from '../view-restaurant-documents-dialog/view-restaurant-documents-dialog.component';
import { RestDocImgProcessingService } from '../rest-doc-img-processing.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserAuthService } from '../_services/user-auth.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-view-my-restaurants',
  templateUrl: './view-my-restaurants.component.html',
  styleUrls: ['./view-my-restaurants.component.css']
})
export class ViewMyRestaurantsComponent implements OnInit {

  restaurantDetails:Restaurant[]=[];
  flag:Boolean=false;
  displayedColumns: string[] = ['Restaurant Name', 'Restaurant Owner', 'Restaurant Address','Images','Edit','Delete','View Restaurant'];

  constructor(private restaurantService:RestaurantService,
              private userAuthService: UserAuthService,
              public documentImagesDialog:MatDialog,
              private restDocImgProcessingService:RestDocImgProcessingService,
              private router:Router,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.getMyRestaurants();
    this.restaurantPresent();
   
  }

  public getMyRestaurants(){
    this.restaurantService.getMyRestaurants()
    .pipe(
      map((x:Restaurant[],i)=>x.map((restaurant:Restaurant)=>this.restDocImgProcessingService.createImages(restaurant)))
    )
    .subscribe(
      (resp:Restaurant[])=>{
      console.log(resp);
      this.restaurantDetails=resp;
      if(resp.length>0){
      this.flag=true;
      }
      console.log(this.flag+ " flag is printing");
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  deleteRestaurant(restaurantId){
    this.restaurantService.deleteRestaurant(restaurantId).subscribe(
      (resp)=>{
        this.flag=false;
        this.getMyRestaurants();
        this.openErrorDialog('Success', 'Restaurant Deleted Successfully');
      },
      (error:HttpErrorResponse)=>{
        this.openErrorDialog('Error', 'Restaurant not Deleted, Try Again');
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

  editRestaurant(restaurantId){
    this.router.navigate(["/createRestaurant",{restaurantId:restaurantId}]);
  }

  viewRestaurant(restaurantId){
    this.router.navigate(["/viewRestaurantMenus",{restaurantId:restaurantId}]);
  }

  public addRestaurant(){
    this.router.navigate(["/createRestaurant"]);
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

  restaurantPresent(){
    return this.flag;
  }

  openErrorDialog(title: string, message: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: {
        title: title,
        message: message,
      },
    });
  }

}
