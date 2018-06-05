import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HadithsComponent} from './hadiths.component';
import {configureTestBed} from '../../test';

describe('HadithsComponent', () => {
  let component: HadithsComponent;
  let fixture: ComponentFixture<HadithsComponent>;

  beforeEach(async(() => {
    // TODO: configureTestBed() adds all imports, declarations, and providers
    // to the test module. Is this the right thing to do, or we should add
    // just enough dependencies to run the tests?
    configureTestBed();
    /*TestBed.configureTestingModule({
      declarations: [ HadithsComponent ]
    })
    .compileComponents();*/
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
