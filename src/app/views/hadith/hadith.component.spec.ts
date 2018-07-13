import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithComponent } from './hadith.component';

describe('HadithComponent', () => {
  let component: HadithComponent;
  let fixture: ComponentFixture<HadithComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadithComponent ]
    })
    .compileComponents();
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
