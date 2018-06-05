import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithtagComponent } from './hadithtags.component';

describe('HadithTagsComponent', () => {
  let component: HadithtagComponent;
  let fixture: ComponentFixture<HadithtagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadithtagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithtagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
