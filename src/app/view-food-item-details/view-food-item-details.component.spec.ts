import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFoodItemDetailsComponent } from './view-food-item-details.component';

describe('ViewFoodItemDetailsComponent', () => {
  let component: ViewFoodItemDetailsComponent;
  let fixture: ComponentFixture<ViewFoodItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFoodItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFoodItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
