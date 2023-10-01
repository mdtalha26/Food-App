import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { FileHandle } from '../_model/file-handle.model';
import { FoodItem } from '../_model/fooditem.model';
import { FoodItemService } from '../_services/food-item.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-food-item',
  templateUrl: './update-food-item.component.html',
  styleUrls: ['./update-food-item.component.css']
})
export class UpdateFoodItemComponent implements OnInit {
  isNewFoodItem=true;

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
    private router:Router,
    private activatedRoute:ActivatedRoute,
    public dialog:MatDialog,
    public location:Location
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.menuId=params['menuId'];
    })
    this.foodItem=this.activatedRoute.snapshot.data['foodItem'];
    if(this.foodItem && this.foodItem.foodItemId){
      this.isNewFoodItem=false;
    }
    console.log("Menu is is printing here"+this.menuId);
  }

  updateFoodItemsInMenu(foodItemForm: NgForm){

    const foodItemFormData = this.prepareFormData(this.foodItem);

    const id=this.menuId;
    this.foodItemService.updateFoodItem(foodItemFormData).subscribe(
      (reponse:FoodItem)=>{
        foodItemForm.reset();
        this.foodItem.foodItemImages=[];
        // this.location.back();
        this.viewFoodItems(this.menuId);
        
        // this.router.navigate(['/showFoodItems/',{menuId}]);
        this.openErrorDialog('Success', 'FoodItem Updated Successfully');
        
  
      },
      (error:HttpErrorResponse)=>{
        this.openErrorDialog('Error', 'Something went wrong. Please try again');
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

  viewFoodItems(menuId){
    console.log(menuId);
    this.router.navigate(['/showFoodItems/',{menuId}]);
  }

}
