import { TestBed } from '@angular/core/testing';

import { BanksService } from './allData';

describe('BanksService', () => {
  let service: BanksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BanksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
