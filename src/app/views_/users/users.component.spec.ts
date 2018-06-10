import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UsersComponent} from './users.component';
import {configureTestBed} from '../../../test';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    // TODO: configureTestBed() adds all imports, declarations, and providers
    // to the test module. Is this the right thing to do, or we should add
    // just enough dependencies to run the tests?
    configureTestBed();
    /*TestBed.configureTestingModule({
      declarations: [ UsersComponent ]
    })
    .compileComponents();*/
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
