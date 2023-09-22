import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../_model/menu.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FoodItem } from '../_model/fooditem.model';
import { FoodItemService } from '../_services/food-item.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewFoodItemImagesDialogComponent } from '../view-food-item-images-dialog/view-food-item-images-dialog.component';
import { FoodItemImageProcessingService } from '../food-item-image-processing.service';
import { map } from 'rxjs/operators';
import { UserAuthService } from '../_services/user-auth.service';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-show-food-items',
  templateUrl: './show-food-items.component.html',
  styleUrls: ['./show-food-items.component.css']
})
export class ShowFoodItemsComponent implements OnInit {

  pageNumber: number = 0;

  showLoadButton = false;

  menuId:number;
  flag:Boolean=false;
  foodItemDetails:FoodItem[]=[];
  displayedColumns: string[] = ['FoodItem Name', 'Description','Price','Images','Edit','Delete','View'];

  constructor(private foodItemService:FoodItemService,
              private userAuthService: UserAuthService,
              public  foodItemImagesDialog:MatDialog,
              private foodItemImageProcessingService:FoodItemImageProcessingService,
              private route:ActivatedRoute,
              public dialog:MatDialog,
              private router:Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.menuId=params['menuId'];
    })
    if (this.isUser()) {
      const index = this.displayedColumns.indexOf('Edit');
      if (index !== -1) {
        this.displayedColumns.splice(index, 2);
      }
      
    }
    this.getFoodItems();
  }

  searchByKeyword(searchkeyword) {
    console.log(searchkeyword);
    this.pageNumber = 0;
    this.foodItemDetails = [];
    this.getFoodItems(searchkeyword);
  }

  public getFoodItems(searchKey: string = ""){
    this.foodItemService.getAllFoodItemsInMenu(this.menuId,this.pageNumber, searchKey)
    .pipe(
      map((x:FoodItem[], i)=> x.map((foodItem:FoodItem)=>this.foodItemImageProcessingService.createImages(foodItem)))
    )
    .subscribe(
      (resp:FoodItem[])=>{
        console.log(resp);
        if(resp.length == 4) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        // this.foodItemDetails=resp;
        this.foodItemDetails = this.foodItemDetails.concat(resp);
        // resp.forEach(p => this.foodItemDetails.push(p));
        if(resp.length>0){
          this.flag=true;
          }
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  public loadMoreProduct() {
    this.pageNumber = this.pageNumber + 1;
    this.getFoodItems();
  }

  public addFoodItem(menuId){
    const id=this.menuId;
    console.log(id);
    this.router.navigate(["/addFoodItemsToMenu",{menuId:id}]);
  }

  deleteFoodItem(foodItemId){
    this.foodItemService.deleteFoodItem(foodItemId).subscribe(
      (resp)=>{
        this.flag=false;
        this.getFoodItems();
        this.openErrorDialog('Success', 'FoodItem Deleted Successfully');
      },
      (error:HttpErrorResponse)=>{
        this.openErrorDialog('Error', 'Something went wrong');
        console.log(error);
      }
    );
  }

  editFoodItemDescription(foodItemId){
    const menuId=this.menuId;
    console.log(foodItemId);
    console.log(menuId);
    const id=this.menuId
    this.router.navigate(['/updateFoodItem/',{foodItemId,menuId}]);
    // this.router.navigate(['/addFoodItemsToMenu/',{menuId:id,foodItemId}]);
  }
  
  viewFoodItemImages(foodItem:FoodItem){
    console.log(foodItem);
    this.foodItemImagesDialog.open(ViewFoodItemImagesDialogComponent, {
      data:{
        images:foodItem.foodItemImages
      },
      height:'500px',
      width:'800px'
    });
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

  showFoodItemDetails(foodItemId) {
    this.router.navigate(['/viewFoodItemDetails', {foodItemId: foodItemId}]);
  }

  public isFoodItemPresent(){
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

