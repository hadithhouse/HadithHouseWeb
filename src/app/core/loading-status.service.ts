import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';

@Injectable()
export class LoadingStatusService {
  pendingRequests = 0;
  isLoading: Subject<boolean> = new Subject<boolean>();

  isLoadingObservable(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  incrementPendingRequests() {
    this.pendingRequests += 1;
    if (this.pendingRequests === 1) {
      this.isLoading.next(true);
    }
  }

  decrementPendingRequests() {
    this.pendingRequests -= 1;
    if (this.pendingRequests === 0) {
      this.isLoading.next(false);
    }
    if (this.pendingRequests < 0) {
      this.pendingRequests = 0;
    }
  }
}
