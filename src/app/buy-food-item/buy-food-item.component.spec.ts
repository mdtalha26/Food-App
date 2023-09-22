import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFoodItemComponent } from './buy-food-item.component';

describe('BuyFoodItemComponent', () => {
  let component: BuyFoodItemComponent;
  let fixture: ComponentFixture<BuyFoodItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyFoodItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyFoodItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
