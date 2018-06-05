import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PageNavComponent} from './page-nav.component';
import {configureTestBed} from '../../test';

describe('PageNavComponent', () => {
  let component: PageNavComponent;
  let fixture: ComponentFixture<PageNavComponent>;

  beforeEach(async(() => {
    // TODO: configureTestBed() adds all imports, declarations, and providers
    // to the test module. Is this the right thing to do, or we should add
    // just enough dependencies to run the tests?
    configureTestBed();
    /*TestBed.configureTestingModule({
      declarations: [ PageNavComponent ]
    })
    .compileComponents();*/
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
