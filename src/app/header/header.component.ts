import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../_services/user-auth.service';
import { UserService } from '../_services/user.service';
import { FoodItemService } from '../_services/food-item.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  cartCount: number = 0;

  cartDetails: any[] = [];
  constructor(
    private userAuthService: UserAuthService,
    private router: Router,
    public userService: UserService,
    public foodItemService: FoodItemService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.foodItemService.cartCount$.subscribe((count) => {
      this.cartCount = count;
    });
    this.foodItemService.getCartCount();

  }

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isRestaurant(){
    return this.userAuthService.isRestaurant();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }


  openEmailClient(recipientEmail: string) {
    const mailtoLink = `mailto:${recipientEmail}`;
    const a = this.renderer.createElement('a');
    this.renderer.setAttribute(a, 'href', mailtoLink);
    this.renderer.setStyle(a, 'display', 'none');
    this.renderer.appendChild(document.body, a);
    a.click();
    this.renderer.removeChild(document.body, a);
  }

  onClickSendEmail() {
    const recipientEmail = 'mynameismohammedtalha@gmail.com';
    this.openEmailClient(recipientEmail);
  }

  

}
