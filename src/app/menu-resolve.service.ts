import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Menu } from './_model/menu.model';
import { Observable, of } from 'rxjs';
import { MenuService } from './_services/menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuResolveService implements Resolve<Menu> {

  constructor(private menuService:MenuService) { }
  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot):Observable<Menu>{
    
    const id=route.paramMap.get("menuId");

    if(id){
      console.log("this is working"+ id);
      console.log(this.menuService.getMenuById(id));
      return this.menuService.getMenuById(id);
    }else{
      return of(this.getMenuDetails());
      
    }
  }

  getMenuDetails(){
    return{
      menuId:null,
      menuName:"",
      menuDescription:""
    }
  }
}
