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

  it('isLoadingObservable() sends true when request count goes above 0 and ' +
    'false when request count goes down to 0',
    inject([LoadingStatusService], (service: LoadingStatusService) => {
      // Increment pending requests count and ensure isLoadingObservable()
      // gets a true value.
      let s1Called = false;
      const s1 = service.isLoadingObservable().subscribe(isLoading => {
        expect(isLoading).toBe(true);
        s1Called = true;
      });
      service.incrementPendingRequests();
      s1.unsubscribe();
      expect(s1Called).toBeTruthy();

      let s2Called = false;
      const s2 = service.isLoadingObservable().subscribe(isLoading => {
        fail('A true value for isLoading was already sent when request count ' +
          'became 1.');
        s2Called = true;
      });
      service.incrementPendingRequests();
      s2.unsubscribe();
      expect(s2Called).toBeFalsy();

      // Decrement pending requests count and ensure isLoadingObservable()
      // gets a false value now.
      let s3Called = false;
      const s3 = service.isLoadingObservable().subscribe(isLoading => {
        fail('A true value for isLoading was already sent when request count ' +
          'became 1.');
        s3Called = true;
      });
      service.decrementPendingRequests();
      s3.unsubscribe();
      expect(s3Called).toBeFalsy();

      // Decrement pending requests count and ensure isLoadingObservable()
      // gets a false value now.
      let s4Called = false;
      const s4 = service.isLoadingObservable().subscribe(isLoading => {
        expect(isLoading).toBe(false);
        s4Called = true;
      });
      service.decrementPendingRequests();
      s4.unsubscribe();
      expect(s4Called).toBeTruthy();
    }));
});
