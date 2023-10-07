import { Component, OnInit } from '@angular/core';
import { Menu } from '../_model/menu.model';
import { NgForm } from '@angular/forms';
import { MenuService } from '../_services/menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Restaurant } from '../_model/restaurant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-add-menu-to-restaurant',
  templateUrl: './add-menu-to-restaurant.component.html',
  styleUrls: ['./add-menu-to-restaurant.component.css']
})
export class AddMenuToRestaurantComponent implements OnInit {

  restaurantId:number;
  menu:Menu={
    menuId:null,
    menuName:"",
    menuDescription:""
  }
  constructor(private menuService:MenuService,
              private route:ActivatedRoute,
              private router:Router,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.restaurantId=params['restaurantId'];
    })
  }

  addMenuToRestaurant(restaurantId:number,menuForm:NgForm){
    this.menuService.addMenuToRestaurant(this.restaurantId,this.menu).subscribe(
      (resp:Restaurant)=>{
        console.log(resp);
        this.openErrorDialog('Success', 'Menu Added Successfully');
        this.router.navigate(["/viewRestaurantMenus",{restaurantId:restaurantId}]);
      },
      (error:HttpErrorResponse)=>{
        this.openErrorDialog('Failed', 'Something went wrong');
        console.log(error);
      }
    );
  }

  editMenu(restaurantId){
    console.log(restaurantId);
  }

  printId(){
    console.log(this.restaurantId);
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
