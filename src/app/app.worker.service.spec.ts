import { TestBed } from '@angular/core/testing';

import { AppWorkerService } from './app.worker.service';

describe('AppWorkerService', () => {
  let service: AppWorkerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppWorkerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
