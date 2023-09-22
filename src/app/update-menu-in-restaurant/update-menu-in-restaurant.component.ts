import { Component, OnInit } from '@angular/core';
import { Menu } from '../_model/menu.model';
import { MenuService } from '../_services/menu.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-update-menu-in-restaurant',
  templateUrl: './update-menu-in-restaurant.component.html',
  styleUrls: ['./update-menu-in-restaurant.component.css']
})
export class UpdateMenuInRestaurantComponent implements OnInit {

  restaurantId:null;
  menuId:null;
  menu:Menu={
    menuId:null,
    menuName:"",
    menuDescription:""
  }

  constructor(private menuService:MenuService,
              private activatedRoute:ActivatedRoute,
              private router:Router,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.menu=this.activatedRoute.snapshot.data['menu'];
      this.menuId=params['menuId'];
      this.restaurantId=params['restaurantId'];
    })
  }

  updateMenuInRestaurant(menuId,menuForm){
    console.log("this update is working" +this.menuId);
    this.menuService.updateMenu(this.menuId,this.menu).subscribe(
      (resp:Menu)=>{
        console.log(resp);
        this.openErrorDialog('Success', 'Menu Updated Successfully');
        this.router.navigate(["/viewRestaurantMenus",{restaurantId:this.restaurantId}]);
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  printId(){

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
