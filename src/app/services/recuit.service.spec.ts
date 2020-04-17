import { TestBed } from '@angular/core/testing';

import { RecuitService } from './recuit.service';

describe('RecuitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecuitService = TestBed.get(RecuitService);
    expect(service).toBeTruthy();
  });
});
