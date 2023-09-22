import { TestBed } from '@angular/core/testing';

import { BuyFoodItemResolverService } from './buy-food-item-resolver.service';

describe('BuyFoodItemResolverService', () => {
  let service: BuyFoodItemResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyFoodItemResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
