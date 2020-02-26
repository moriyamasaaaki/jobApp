import { TestBed } from '@angular/core/testing';

import { LikedService } from './liked.service';

describe('LikedService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LikedService = TestBed.get(LikedService);
    expect(service).toBeTruthy();
  });
});
