import { TestBed } from '@angular/core/testing';

import { OktaApiService } from './okta-api.service';

describe('OktaApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OktaApiService = TestBed.get(OktaApiService);
    expect(service).toBeTruthy();
  });
});
