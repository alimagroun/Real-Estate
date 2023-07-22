import { TestBed } from '@angular/core/testing';

import { PropertyAuthorizationGuard } from './property-authorization.guard';

describe('PropertyAuthorizationGuard', () => {
  let guard: PropertyAuthorizationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PropertyAuthorizationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
