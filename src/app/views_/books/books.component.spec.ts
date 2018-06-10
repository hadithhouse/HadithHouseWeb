import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BooksComponent} from './books.component';
import {configureTestBed} from '../../../test';

describe('BooksComponent', () => {
  let component: BooksComponent;
  let fixture: ComponentFixture<BooksComponent>;

  beforeEach(async(() => {
    // TODO: configureTestBed() adds all imports, declarations, and providers
    // to the test module. Is this the right thing to do, or we should add
    // just enough dependencies to run the tests?
    configureTestBed();
    /*TestBed.configureTestingModule({
      declarations: [ BooksComponent ]
    }).compileComponents();*/
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
