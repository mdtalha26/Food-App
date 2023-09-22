import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../_model/menu.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from '../_services/user-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-view-restaurant-menus',
  templateUrl: './view-restaurant-menus.component.html',
  styleUrls: ['./view-restaurant-menus.component.css']
})
export class ViewRestaurantMenusComponent implements OnInit {

  restaurantId:number;
  flag:Boolean=false;
  menuDetails:Menu[]=[];
  displayedColumns: string[] = ['Menu Name', 'Description','Edit','Delete','View FoodItems'];

  constructor(private menuService:MenuService,
              private userAuthService: UserAuthService,
              private route:ActivatedRoute,
              private router:Router,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(params=>{
      this.restaurantId=params['restaurantId'];
    })
    if (this.isUser()) {
      const index = this.displayedColumns.indexOf('Edit');
      if (index !== -1) {
        this.displayedColumns.splice(index, 2);
      }
      
    }
    
    this.getRestaurantMenus();
    this.isMenuPresent();
  }

  public getRestaurantMenus(){
    this.menuService.getRestaurantMenus(this.restaurantId).subscribe(
      (resp:Menu[])=>{
        console.log(resp);
        this.menuDetails=resp;
        if(resp.length>0){
          this.flag=true;
          }
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  public addMenu(restaurantId){
    const id=this.restaurantId;
    this.router.navigate(["/addMenuToRestaurant",{restaurantId:id}]);
  }

  deleteMenu(menuId){
    this.menuService.deleteMenuFromRestaurant(menuId).subscribe(
      (resp)=>{
        this.flag=false;
        this.getRestaurantMenus();
        this.openErrorDialog('Success', 'Menu Deleted Successfully');
      },
      (error:HttpErrorResponse)=>{
        console.log(error);
      }
    );
  }

  editMenuDescription(menuId){
    const restaurantId=this.restaurantId;
    console.log(restaurantId);
    console.log(menuId);
    //this.router.navigate(['/addMenuToRestaurant/',{restaurantId,menuId}]);
    this.router.navigate(['/updateMenuInRestaurant/',{restaurantId,menuId}]);
  }
  viewFoodItems(menuId){
    console.log(menuId);
    this.router.navigate(['/showFoodItems/',{menuId}]);
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

  public isMenuPresent(){
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
