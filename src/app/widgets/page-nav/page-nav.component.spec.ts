import * as $ from 'jquery';
import * as _ from 'lodash';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNavComponent } from './page-nav.component';

describe('PageNavComponent', () => {
  let component: PageNavComponent;
  let html: HTMLElement;
  let fixture: ComponentFixture<PageNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageNavComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageNavComponent);
    component = fixture.componentInstance;
    component.pageCount = 10;
    html = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('setPage() minimum is 1', () => {
    component.setPage(-1);
    expect(component.page).toBe(1);
  });

  it('setPage() maximum is pageCount', () => {
    component.setPage(component.pageCount + 100);
    expect(component.page).toBe(component.pageCount);
  });

  it('setPage() correctly updates the page', () => {
    component.setPage(2);
    expect(component.page).toBe(2);
    component.setPage(5);
    expect(component.page).toBe(5);
  });

  it('pageRange() returns 2 previous, current, and 2 next pages.', () => {
    component.setPage(1);
    expect(component.pageRange()).toEqual([1, 2, 3, 4, 5]);

    component.setPage(component.pageCount);
    expect(component.pageRange()).toEqual([
      component.pageCount - 4,
      component.pageCount - 3,
      component.pageCount - 2,
      component.pageCount - 1,
      component.pageCount]);

    component.setPage(5);
    expect(component.pageRange()).toEqual([3, 4, 5, 6, 7]);
  });

  it('HTML contains next, prev, and pages buttons', () => {
    const prevButton = $('[type="button"]', html).first();
    const nextButton = $('[type="button"]', html).last();
    let pages = $('[type="button"]', html);
    pages = pages.slice(1, pages.length - 2);
    expect(prevButton.text().trim()).toBe('\u00AB');
    expect(nextButton.text().trim()).toBe('\u00BB');
    _.each(pages, p => {
      const int = parseInt($(p).text().trim());
      const isInt = !isNaN(int);
      expect(isInt).toBe(true);
    });
  });
});
