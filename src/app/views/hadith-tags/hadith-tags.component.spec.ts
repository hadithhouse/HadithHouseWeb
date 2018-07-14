import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HadithTagsComponent} from './hadith-tags.component';

describe('HadithTagsComponent', () => {
  let component: HadithTagsComponent;
  let fixture: ComponentFixture<HadithTagsComponent>;

  beforeEach(async(() => {
    // TODO: configureTestBed() adds all imports, declarations, and providers
    // to the test module. Is this the right thing to do, or we should add
    // just enough dependencies to run the tests?
    // configureTestBed();
    TestBed.configureTestingModule({
      declarations: [HadithTagsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /*it('should create', () => {
    expect(component).toBeTruthy();
  });*/
});
