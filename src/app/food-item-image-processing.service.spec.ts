import { TestBed } from '@angular/core/testing';

import { FoodItemImageProcessingService } from './food-item-image-processing.service';

describe('FoodItemImageProcessingService', () => {
  let service: FoodItemImageProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FoodItemImageProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
