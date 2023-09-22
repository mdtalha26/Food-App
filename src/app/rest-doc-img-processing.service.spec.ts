import { TestBed } from '@angular/core/testing';

import { RestDocImgProcessingService } from './rest-doc-img-processing.service';

describe('RestDocImgProcessingService', () => {
  let service: RestDocImgProcessingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestDocImgProcessingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
