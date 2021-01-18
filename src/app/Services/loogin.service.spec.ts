import { TestBed } from '@angular/core/testing';

import { LooginService } from './loogin.service';

describe('LooginService', () => {
  let service: LooginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LooginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
