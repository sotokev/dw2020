import { TestBed } from '@angular/core/testing';

import { ProductByUserService } from './product-by-user.service';

describe('ProductByUserService', () => {
  let service: ProductByUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductByUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
