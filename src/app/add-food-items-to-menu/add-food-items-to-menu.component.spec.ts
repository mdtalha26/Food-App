import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFoodItemsToMenuComponent } from './add-food-items-to-menu.component';

describe('AddFoodItemsToMenuComponent', () => {
  let component: AddFoodItemsToMenuComponent;
  let fixture: ComponentFixture<AddFoodItemsToMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFoodItemsToMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFoodItemsToMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
