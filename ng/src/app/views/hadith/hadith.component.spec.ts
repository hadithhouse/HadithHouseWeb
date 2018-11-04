import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HadithComponent} from './hadith.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of} from 'rxjs/internal/observable/of';
import {AuthServiceStub, FaIconComponentStub} from '../../stubs';
import {FormsModule} from '@angular/forms';
import {WidgetsModule} from '../../widgets/widgets.module';
import {ButtonsModule, ModalModule} from 'ngx-bootstrap';
import {AuthService} from '../../core/auth.service';
import {Hadith, HadithApiService} from '../../services/hadith-api.service';
import {
  HadithTag,
  HadithTagApiService
} from '../../services/hadith-tag-api.service';

class ActivatedRouteStub {
  paramMap = of(convertToParamMap({
    id: '1'
  }));
}

describe('HadithComponent', () => {
  let component: HadithComponent;
  let fixture: ComponentFixture<HadithComponent>;

  function mockHadithApiService(): any {
    const hadithApi = jasmine.createSpyObj('HadithApiService', ['get']);
    hadithApi.get.and.returnValue(of(new Hadith()));
    return hadithApi;
  }

  function mockHadithTagApiService(): any {
    const hadithApi = jasmine.createSpyObj('HadithApiTagService', ['get']);
    hadithApi.get.and.returnValue(of(new HadithTag()));
    return hadithApi;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ButtonsModule.forRoot(),
        FormsModule,
        ModalModule.forRoot(),
        WidgetsModule
      ],
      declarations: [
        HadithComponent,
        FaIconComponentStub
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub
        },
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteStub
        },
        {
          provide: HadithApiService,
          useValue: mockHadithApiService()
        },
        {
          provide: HadithTagApiService,
          useValue: mockHadithTagApiService()
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
