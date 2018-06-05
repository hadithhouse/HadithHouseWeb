import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HadithTagComponent} from './hadithtag.component';
import {configureTestBed} from '../../test';

describe('HadithTagsComponent', () => {
  let component: HadithTagComponent;
  let fixture: ComponentFixture<HadithTagComponent>;

  beforeEach(async(() => {
    // TODO: configureTestBed() adds all imports, declarations, and providers
    // to the test module. Is this the right thing to do, or we should add
    // just enough dependencies to run the tests?
    configureTestBed();
    /*TestBed.configureTestingModule({
      declarations: [ HadithTagComponent ]
    })
    .compileComponents();*/
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
