import {inject} from '@angular/core/testing';

import {HadithHouseApiService} from './hadith-house-api.service';
import {configureTestBed} from '../test';

describe('HadithHouseApiService', () => {
  beforeEach(() => {
    // TODO: configureTestBed() adds all imports, declarations, and providers
    // to the test module. Is this the right thing to do, or we should add
    // just enough dependencies to run the tests?
    configureTestBed();
    /*TestBed.configureTestingModule({
      providers: [HadithHouseApiService]
    });*/
  });

  // tslint:disable-next-line:max-line-length
  it('should be created', inject([HadithHouseApiService], (service: HadithHouseApiService) => {
    expect(service).toBeTruthy();
  }));
});
