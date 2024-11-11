import { TestBed } from '@angular/core/testing';

import { BatchResultService } from './batch-result.service';

describe('BatchResultService', () => {
  let service: BatchResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BatchResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
