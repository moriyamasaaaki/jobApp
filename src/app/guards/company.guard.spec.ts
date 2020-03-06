import { TestBed, async, inject } from '@angular/core/testing';

import { CompanyGuard } from './company.guard';

describe('CompanyGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanyGuard]
    });
  });

  it('should ...', inject([CompanyGuard], (guard: CompanyGuard) => {
    expect(guard).toBeTruthy();
  }));
});
