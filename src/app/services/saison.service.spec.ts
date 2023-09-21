import { TestBed } from '@angular/core/testing';

import { SaisonService } from './saison.service';

describe('SaisonService', () => {
  let service: SaisonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaisonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
