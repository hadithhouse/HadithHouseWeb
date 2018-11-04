import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HadithComponent} from './hadith.component';
import {Hadith, HadithApiService} from '../../services/hadith-api.service';
import {of} from 'rxjs/internal/observable/of';
import {FaIconComponentStub} from '../../stubs';
import {RouterTestingModule} from '@angular/router/testing';

describe('HadithComponent', () => {
  let component: HadithComponent;
  let fixture: ComponentFixture<HadithComponent>;
  const HADITH_ID = 1;

  function mockHadithApiService(): any {
    const hadithApi = jasmine.createSpyObj('HadithApiService', ['get']);
    hadithApi.get.and.returnValue(of(new Hadith()));
    return hadithApi;
  }

  beforeEach(async(() => {
    mockHadithApiService();

    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        HadithComponent,
        FaIconComponentStub
      ],
      providers: [
        {
          provide: HadithApiService,
          useValue: mockHadithApiService()
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithComponent);
    component = fixture.componentInstance;
    component.hadithId = HADITH_ID;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
