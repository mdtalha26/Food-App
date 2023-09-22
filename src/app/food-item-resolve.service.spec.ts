import { TestBed } from '@angular/core/testing';

import { FoodItemResolveService } from './food-item-resolve.service';

describe('FoodItemResolveService', () => {
  let service: FoodItemResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodItemResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
