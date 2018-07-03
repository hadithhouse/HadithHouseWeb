import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HadithsComponent} from './hadiths.component';
import {of} from 'rxjs/internal/observable/of';
import {Hadith, HadithApiService} from '../../services/hadith-api.service';
import {NO_ERRORS_SCHEMA} from '@angular/core';
import {PagedResults} from '../../services/hadith-house-api-base';

describe('HadithsComponent', () => {
  let component: HadithsComponent;
  let fixture: ComponentFixture<HadithsComponent>;

  const hadith1 = new Hadith();
  hadith1.id = 1;
  hadith1.text = 'Hadith 1';
  const hadith2 = new Hadith();
  hadith2.id = 2;
  hadith2.text = 'Hadith 2';
  const hadith3 = new Hadith();
  hadith3.id = 3;
  hadith3.text = 'Hadith 3';
  const mockHadiths = [
    hadith1,
    hadith2,
    hadith3
  ];

  function mockHadithApiService(): any {
    const hadithApi = jasmine.createSpyObj('HadithApiService', ['query']);
    hadithApi.query.and.returnValue(of(new PagedResults(mockHadiths)));
    return hadithApi;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HadithsComponent],
      providers: [
        {
          provide: HadithApiService,
          useValue: mockHadithApiService()
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithsComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('hadithsObj should resolve into hadiths loaded from the API', async(() => {
    expect(component.hadithsObs).toBeTruthy();
    component.hadithsObs.subscribe(hadiths => {
      expect(hadiths).toBeTruthy();
      expect(hadiths.length).toEqual(mockHadiths.length);
      for (let i = 0; i < hadiths.length; i += 1) {
        expect(hadiths[i].equals(mockHadiths[i])).toBe(true);
      }
    });
  }));
});
