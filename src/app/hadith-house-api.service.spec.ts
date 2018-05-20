import { TestBed, inject } from '@angular/core/testing';

import { HadithHouseApiService } from './hadith-house-api.service';

describe('HadithHouseApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HadithHouseApiService]
    });
  });

  // tslint:disable-next-line:max-line-length
  it('should be created', inject([HadithHouseApiService], (service: HadithHouseApiService) => {
    expect(service).toBeTruthy();
  }));
});
