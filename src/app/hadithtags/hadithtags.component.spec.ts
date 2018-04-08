import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HadithTagsComponent } from './hadithtags.component';

describe('HadithTagsComponent', () => {
  let component: HadithTagsComponent;
  let fixture: ComponentFixture<HadithTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HadithTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HadithTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
