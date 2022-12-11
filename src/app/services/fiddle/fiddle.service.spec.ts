import { TestBed } from '@angular/core/testing';

import { FiddleService } from './fiddle.service';

describe('FiddleService', () => {
  let service: FiddleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiddleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
