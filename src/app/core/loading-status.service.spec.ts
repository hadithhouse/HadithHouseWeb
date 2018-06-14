import { TestBed, inject } from '@angular/core/testing';

import { LoadingStatusService } from './loading-status.service';

describe('LoadingStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingStatusService]
    });
  });

  it('should be created', inject([LoadingStatusService], (service: LoadingStatusService) => {
    expect(service).toBeTruthy();
  }));
});
