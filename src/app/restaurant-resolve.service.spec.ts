import { TestBed } from '@angular/core/testing';

import { RestaurantResolveService } from './restaurant-resolve.service';

describe('RestaurantResolveService', () => {
  let service: RestaurantResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
