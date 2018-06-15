import {TestBed, inject} from '@angular/core/testing';

import {LoadingStatusService} from './loading-status.service';

describe('LoadingStatusService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingStatusService]
    });
  });

  it('should be created', inject([LoadingStatusService],
    (service: LoadingStatusService) => {
      expect(service).toBeTruthy();
    }));

  it('pendingRequests is 0 initially', inject([LoadingStatusService],
    (service: LoadingStatusService) => {
      expect(service.pendingRequests).toBe(0);
    }));

  it('incrementPendingRequests() on 0 pending requests causes ' +
    'isLoadingObservable() to get a true next value.',
    inject([LoadingStatusService], (service: LoadingStatusService) => {
      // Increment pending requests count and ensure isLoadingObservable()
      // gets a true value.
      service.incrementPendingRequests();
      service.isLoadingObservable().subscribe(isLoading => {
        expect(isLoading).toBe(true);
      }).unsubscribe();

      // Decrement pending requests count and ensure isLoadingObservable()
      // gets a false value now.
      service.decrementPendingRequests();
      service.isLoadingObservable().subscribe(isLoading => {
        expect(isLoading).toBe(false);
      }).unsubscribe();
    }));
});
