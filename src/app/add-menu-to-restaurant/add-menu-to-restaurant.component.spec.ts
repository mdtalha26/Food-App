import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuToRestaurantComponent } from './add-menu-to-restaurant.component';

describe('AddMenuToRestaurantComponent', () => {
  let component: AddMenuToRestaurantComponent;
  let fixture: ComponentFixture<AddMenuToRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuToRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMenuToRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
