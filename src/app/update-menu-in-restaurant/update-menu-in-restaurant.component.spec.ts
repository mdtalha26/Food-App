import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMenuInRestaurantComponent } from './update-menu-in-restaurant.component';

describe('UpdateMenuInRestaurantComponent', () => {
  let component: UpdateMenuInRestaurantComponent;
  let fixture: ComponentFixture<UpdateMenuInRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMenuInRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMenuInRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
