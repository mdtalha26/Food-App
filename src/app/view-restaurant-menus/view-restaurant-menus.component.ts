import { Component, OnInit } from '@angular/core';
import { MenuService } from '../_services/menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Menu } from '../_model/menu.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserAuthService } from '../_services/user-auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';
import { RestaurantService } from '../_services/restaurant.service';
import { Restaurant } from '../_model/restaurant.model';

@Component({
  selector: 'app-view-restaurant-menus',
  templateUrl: './view-restaurant-menus.component.html',
  styleUrls: ['./view-restaurant-menus.component.css']
})
export class ViewRestaurantMenusComponent implements OnInit {

  restaurantId:number;
  restaurant:Restaurant;
  menuId:number;
  restaurantName:String;
  restaurantAddress:String;
  flag:Boolean=false;
  menuDetails:Menu[]=[];
  displayedColumns: string[] = ['Menu Name','Edit','Delete'];

  constructor(private menuService:MenuService,
              private restaurantService:RestaurantService,
              private userAuthService: UserAuthService,
              private route:ActivatedRoute,
              private router:Router,
              public dialog:MatDialog) { }

  ngOnInit(): void {
    this.restaurant = this.route.snapshot.data['restaurant'];
    console.log(this.restaurant);
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
    this.getRestaurantDetails();
  }

  public getRestaurantMenus(){
    this.menuService.getRestaurantMenus(this.restaurantId).subscribe(
      (resp:Menu[])=>{
        console.log(resp);
        this.menuDetails=resp;
        this.menuId=resp[0].menuId;
        if(resp.length>0){
          this.flag=true;
          }
      },(error:HttpErrorResponse)=>{
        console.log(error);
      }
    )
  }

  public getRestaurantDetails(){
    this.restaurantService.getRestaurantById(this.restaurantId).subscribe(
      (resp:Restaurant)=>{
        this.restaurantName=resp.restaurantName;
        this.restaurantAddress=resp.restaurantAddress;
        console.log(this.restaurantName);
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
        this.openErrorDialog('Failed', 'Something went wrong');
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
    this.menuId=menuId;
    console.log(menuId);
    // this.router.navigate(['/showFoodItems/',{menuId}]);
  }

  public isUser() {
    return this.userAuthService.isUser();
  }

  public isRestaurant(){
    return this.userAuthService.isRestaurant();
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

  onBack(){
    if(this.isRestaurant()){
    this.router.navigate(['/viewMyRestaurants']);
    }else{
      this.router.navigate(['']);
    }
  }


}
