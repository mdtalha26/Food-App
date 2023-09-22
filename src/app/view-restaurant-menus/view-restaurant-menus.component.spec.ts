import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestaurantMenusComponent } from './view-restaurant-menus.component';

describe('ViewRestaurantMenusComponent', () => {
  let component: ViewRestaurantMenusComponent;
  let fixture: ComponentFixture<ViewRestaurantMenusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRestaurantMenusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRestaurantMenusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
