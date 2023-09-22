import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewFoodItemImagesDialogComponent } from './view-food-item-images-dialog.component';

describe('ViewFoodItemImagesDialogComponent', () => {
  let component: ViewFoodItemImagesDialogComponent;
  let fixture: ComponentFixture<ViewFoodItemImagesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewFoodItemImagesDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewFoodItemImagesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
