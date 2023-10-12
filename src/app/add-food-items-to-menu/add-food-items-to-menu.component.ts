import { Component, OnInit } from '@angular/core';
import { Menu } from '../_model/menu.model';
import { NgForm } from '@angular/forms';
import { MenuService } from '../_services/menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Restaurant } from '../_model/restaurant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodItem } from '../_model/fooditem.model';
import { FoodItemService } from '../_services/food-item.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FileHandle } from '../_model/file-handle.model';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-food-items-to-menu',
  templateUrl: './add-food-items-to-menu.component.html',
  styleUrls: ['./add-food-items-to-menu.component.css']
})
export class AddFoodItemsToMenuComponent implements OnInit {
  isNewFoodItem=true;

  restaurantId=null;
  menuId=null;
  foodItem: FoodItem={
    foodItemId:null,
    foodItemName:"",
    foodItemDescription:"",
    foodItemCategory:"",
    foodItemPrice:null,
    foodItemImages:[]
  }
  // route: any;
  // restaurantId: any;
  constructor(
    private foodItemService:FoodItemService,
    private sanitizer:DomSanitizer,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.menuId=params['menuId'];
      this.restaurantId=params['restaurantId'];
    })
    // this.foodItem=this.activatedRoute.snapshot.data['foodItem']
    if(this.foodItem && this.foodItem.foodItemId){
      this.isNewFoodItem=false;
    }
  }

  addFoodItemsToMenu(menuId,foodItemForm: NgForm){

    const foodItemFormData = this.prepareFormData(this.foodItem);
    console.log(this.foodItem.foodItemCategory);


    this.foodItemService.addFoodItemsToMenu(menuId,foodItemFormData).subscribe(
      (reponse:FoodItem)=>{
        console.log("Restaurant id is "+ this.restaurantId);
        foodItemForm.reset();
        
        this.foodItem.foodItemImages=[];
        this.openErrorDialog('Success', 'Added FoodItem Successfully');
        this.router.navigate(["/viewRestaurantMenus",{restaurantId:this.restaurantId}]);
      },
      (error:HttpErrorResponse)=>{
        this.openErrorDialog('Error', 'Something went wrong. Please check if you have uploaded Image and Try again');
        console.log(error);
      }
    );
  }

  prepareFormData(foodItem:FoodItem):FormData{
    const formData=new FormData();
    formData.append(
      'foodItem',
      new Blob([JSON.stringify(foodItem)],{type:'application/json'})
    );
    for(var i=0;i<foodItem.foodItemImages.length;i++){
      formData.append(
        'imageFile',
        foodItem.foodItemImages[i].file,
        foodItem.foodItemImages[i].file.name
        );
    }

    return formData;
  }

  onFileSelected(event){
    if(event.target.files){
      const file = event.target.files[0];

      const fileHandle:FileHandle={
        file:file,
        url: this.sanitizer.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.foodItem.foodItemImages.push(fileHandle);


    }
  }

  removeImage(i:number){
    this.foodItem.foodItemImages.splice(i,1);
  }


  fileDropped(fileHandle:FileHandle){
    this.foodItem.foodItemImages.push(fileHandle);
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
