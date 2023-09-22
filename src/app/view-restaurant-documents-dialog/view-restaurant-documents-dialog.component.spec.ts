import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRestaurantDocumentsDialogComponent } from './view-restaurant-documents-dialog.component';

describe('ViewRestaurantDocumentsDialogComponent', () => {
  let component: ViewRestaurantDocumentsDialogComponent;
  let fixture: ComponentFixture<ViewRestaurantDocumentsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRestaurantDocumentsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewRestaurantDocumentsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
