import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddNewProductComponent } from "./add-new-product/add-new-product.component";
import { AdminComponent } from "./admin/admin.component";
import { BuyProductResolverService } from "./buy-product-resolver.service";
import { BuyProductComponent } from "./buy-product/buy-product.component";
import { CartComponent } from "./cart/cart.component";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { HomeComponent } from "./home/home.component";
import { LoginComponent } from "./login/login.component";
import { MyOrdersComponent } from "./my-orders/my-orders.component";
import { OrderConfirmationComponent } from "./order-confirmation/order-confirmation.component";
import { OrderDetailsComponent } from "./order-details/order-details.component";
import { ProductResolveService } from "./product-resolve.service";
import { ProductViewDetailsComponent } from "./product-view-details/product-view-details.component";
import { RegisterComponent } from "./register/register.component";
import { ShowProductDetailsComponent } from "./show-product-details/show-product-details.component";
import { UserComponent } from "./user/user.component";
import { AuthGuard } from "./_auth/auth.guard";
import { CreateRestaurantComponent } from "./create-restaurant/create-restaurant.component";
import { ViewAllRestaurantsComponent } from "./view-all-restaurants/view-all-restaurants.component";
import { RestaurantResolveService } from "./restaurant-resolve.service";
import { RestaurantComponent } from "./restaurant/restaurant.component";
import { ViewMyRestaurantsComponent } from "./view-my-restaurants/view-my-restaurants.component";
import { AddMenuToRestaurantComponent } from "./add-menu-to-restaurant/add-menu-to-restaurant.component";
import { ViewRestaurantMenusComponent } from "./view-restaurant-menus/view-restaurant-menus.component";
import { MenuResolveService } from "./menu-resolve.service";
import { UpdateMenuInRestaurantComponent } from "./update-menu-in-restaurant/update-menu-in-restaurant.component";
import { ShowFoodItemsComponent } from "./show-food-items/show-food-items.component";
import { AddFoodItemsToMenuComponent } from "./add-food-items-to-menu/add-food-items-to-menu.component";
import { FoodItemResolveService } from "./food-item-resolve.service";
import { UpdateFoodItemComponent } from "./update-food-item/update-food-item.component";
import { ViewFoodItemDetailsComponent } from "./view-food-item-details/view-food-item-details.component";
import { BuyFoodItemComponent } from "./buy-food-item/buy-food-item.component";
import { BuyFoodItemResolverService } from "./buy-food-item-resolver.service";

const routes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path:"restaurant",
    component: RestaurantComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Restaurant"] },
  },
  {
    path: "user",
    component: UserComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] },
  },
  { path: "login", component: LoginComponent },
  { path: "forbidden", component: ForbiddenComponent },
  { 
    path: "createRestaurant", component: CreateRestaurantComponent,canActivate:[AuthGuard],data:{roles:['Admin','Restaurant']},
    resolve:{
      restaurant:RestaurantResolveService
    }
  },
  { 
    path: "viewAllRestaurants", component:ViewAllRestaurantsComponent,canActivate:[AuthGuard],data:{roles:['Admin','User']}
  },
  { 
    path:"viewMyRestaurants", component:ViewMyRestaurantsComponent,canActivate:[AuthGuard],data:{roles:["Restaurant"]}
  },
  {
    path: "addNewProduct",
    component: AddNewProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
    resolve: {
      product: ProductResolveService,
    },
  },
  {
    path: "showProductDetails",
    component: ShowProductDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ["Admin"] },
  },
  {
    path: "orderInformation",
    component: OrderDetailsComponent,
    canActivate: [AuthGuard],
    data: { roles: ['Admin','Restaurant'] },
  },
  {
    path: "productViewDetails",
    component: ProductViewDetailsComponent,
    resolve: { product: ProductResolveService },
  },
  {
    path: "viewFoodItemDetails",
    component: ViewFoodItemDetailsComponent,
    resolve: { foodItem:FoodItemResolveService},
  },
  {
    path: "buyProduct",
    component: BuyProductComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] },
    resolve: {
      productDetails: BuyProductResolverService,
    },
  },
  {
    path:"buyFoodItem",
    component: BuyFoodItemComponent,
    data: { roles: ["User"] },
    resolve: {
      foodItemDetails: BuyFoodItemResolverService,
    },
  },
  {
    path: "cart",
    component: CartComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] }
  },
  {
    path:"orderConfirm",
    component: OrderConfirmationComponent,
    canActivate: [AuthGuard],
    data: { roles: ["User"] }
  },
  {
    path:"myOrders",
    component: MyOrdersComponent,
    canActivate: [AuthGuard],
    data: { roles: ['User'] }
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path:"addMenuToRestaurant", component:AddMenuToRestaurantComponent
  },
  {
    path:"viewRestaurantMenus",component:ViewRestaurantMenusComponent
  },
  { path: 'viewRestaurantMenus/:restaurantId', component: ViewRestaurantMenusComponent },
  {
    path: 'updateMenuInRestaurant', component: UpdateMenuInRestaurantComponent,
    resolve:{
      menu:MenuResolveService
    }
  },
  {
    path: 'showFoodItems', component:ShowFoodItemsComponent
  },
  {
    path:'addFoodItemsToMenu', component:AddFoodItemsToMenuComponent,
    
  },
  {
    path: 'updateFoodItem', component:UpdateFoodItemComponent,
    resolve:{
      foodItem:FoodItemResolveService
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
