import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyRestaurantsComponent } from './view-my-restaurants.component';

describe('ViewMyRestaurantsComponent', () => {
  let component: ViewMyRestaurantsComponent;
  let fixture: ComponentFixture<ViewMyRestaurantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyRestaurantsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
