import { TestBed } from '@angular/core/testing';

import { MenuResolveService } from './menu-resolve.service';

describe('MenuResolveService', () => {
  let service: MenuResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MenuResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
