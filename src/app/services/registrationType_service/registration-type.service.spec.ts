import { TestBed } from '@angular/core/testing';

import { RegistrationTypeService } from './registration-type.service';

describe('RegistrationTypeService', () => {
  let service: RegistrationTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrationTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
