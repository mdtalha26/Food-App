import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../_model/restaurant.model';
import { NgForm } from '@angular/forms';
import { RestaurantService } from '../_services/restaurant.service';
import { Product } from '../_model/product.model';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle.model';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';


@Component({
  selector: 'app-create-restaurant',
  templateUrl: './create-restaurant.component.html',
  styleUrls: ['./create-restaurant.component.css']
})
export class CreateRestaurantComponent implements OnInit {
  isNewRestaurant=true;


  restaurant: Restaurant={
    restaurantId:null,
    restaurantName:"",
    fssaiLicenseNumber:"",
    panCard:"",
    restaurantAddress:"",
    documents:[]
  }
  constructor(
    private restaurantService:RestaurantService,
    private sanitizer:DomSanitizer,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    public dialog:MatDialog
  ) { }

  ngOnInit(): void {
    this.restaurant=this.activatedRoute.snapshot.data['restaurant']
    if(this.restaurant && this.restaurant.restaurantId){
      this.isNewRestaurant=false;
    }
  }

  createRestaurant(restaurantForm: NgForm){

    const restaurantFormData = this.prepareFormData(this.restaurant);


    this.restaurantService.createRestaurant(restaurantFormData).subscribe(
      (response: Restaurant)=>{
        restaurantForm.reset();
        this.restaurant.documents=[];
        if(this.isNewRestaurant){
          this.openErrorDialog('Success', 'Restaurant created successfully');
        }else{
          this.openErrorDialog('Success', 'Restaurant updated successfully');
        }
        // alert("Restaurant Created Successfully");
        this.router.navigate(["/viewMyRestaurants"]);

      },
      (error)=>{
        if(error.status===409){
        this.openErrorDialog('Error', error.error);
        }else{
          this.openErrorDialog('Error', 'There was an error while registering the restaurant.Please check if you have uploaded Image and try again.'+error.error);
        }
        console.log(error);
      }
    );
  }

  prepareFormData(restaurant:Restaurant):FormData{
    const formData=new FormData();
    formData.append(
      'restaurant',
      new Blob([JSON.stringify(restaurant)],{type:'application/json'})
    );
    for(var i=0;i<restaurant.documents.length;i++){
      formData.append(
        'imageFile',
        restaurant.documents[i].file,
        restaurant.documents[i].file.name
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
      this.restaurant.documents.push(fileHandle);


    }
  }

  removeImage(i:number){
    this.restaurant.documents.splice(i,1);
  }


  fileDropped(fileHandle:FileHandle){
    this.restaurant.documents.push(fileHandle);
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
