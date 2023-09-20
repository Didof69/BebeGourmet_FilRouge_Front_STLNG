import { TestBed } from '@angular/core/testing';

import { AlimentService } from './aliment.service';

describe('AlimentService', () => {
  let service: AlimentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlimentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
