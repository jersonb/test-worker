import { TestBed } from '@angular/core/testing';

import { SlowApiService } from './slow-api.service';

describe('SlowApiService', () => {
  let service: SlowApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SlowApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
