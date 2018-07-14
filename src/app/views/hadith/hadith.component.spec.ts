import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HadithComponent} from './hadith.component';
import {ActivatedRoute, convertToParamMap} from '@angular/router';
import {of} from 'rxjs/internal/observable/of';

class ActivatedRouteMock {
  paramMap = of(convertToParamMap({
    id: '1'
  }));
}

describe('HadithComponent', () => {
  let component: HadithComponent;
  let fixture: ComponentFixture<HadithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HadithComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useClass: ActivatedRouteMock
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
