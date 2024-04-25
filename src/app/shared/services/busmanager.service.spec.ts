import { TestBed } from '@angular/core/testing';

import { BusmanagerService } from './busmanager.service';

describe('BusmanagerService', () => {
  let service: BusmanagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BusmanagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
