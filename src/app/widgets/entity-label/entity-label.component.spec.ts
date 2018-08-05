import * as $ from 'jquery';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EntityLabelComponent} from './entity-label.component';
import {of} from 'rxjs/internal/observable/of';
import {
  HadithTag,
  HadithTagApiService
} from '../../services/hadith-tag-api.service';
import {FormsModule} from '@angular/forms';
import {FaIconComponentStub} from '../../stubs';
import {Book, BookApiService} from '../../services/book-api.service';

describe('EntityLabelComponent', () => {
  let component: EntityLabelComponent;
  let fixture: ComponentFixture<EntityLabelComponent>;
  let html: HTMLElement;
  let book: Book;

  function mockBookApiService(): any {
    const bookApi = jasmine.createSpyObj('BookApiService', ['get']);
    book = new Book();
    book.id = 1;
    book.title = 'Test Book';
    bookApi.get.and.returnValue(of(book));
    return bookApi;
  }

  function mockHadithTagApiService(): any {
    const hadithTagApi = jasmine.createSpyObj('HadithTagApiService', ['get']);
    const hadithTag = new HadithTag();
    hadithTag.id = 1;
    hadithTag.name = 'Test Tag';
    hadithTagApi.get.and.returnValue(of(hadithTag));
    return hadithTagApi;
  }

  // TODO: Implement
  /*
  function mockPersonApiService(): any {
    const hadithApi = jasmine.createSpyObj('PersonApiService', ['get']);
    const person = new Person();
    hadithApi.get.and.returnValue(of(new Person()));
    return hadithApi;
  }
  */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        EntityLabelComponent,
        FaIconComponentStub
      ],
      providers: [
        {
          provide: BookApiService,
          useValue: mockBookApiService()
        },
        {
          provide: HadithTagApiService,
          useValue: mockHadithTagApiService()
        }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityLabelComponent);
    component = fixture.componentInstance;
    html = fixture.nativeElement;
  });

  it('should create', () => {
    component.entityId = 1;
    component.entityType = 'book';
    component.ngOnInit();
    expect(component).toBeTruthy();
  });

  it('should contain label', () => {
    component.entityId = 1;
    component.entityType = 'book';
    fixture.detectChanges();
    const span = $('span', html).first();
    const text = span.text().trim();
    expect(text).toEqual(book.title);
  });

  it("'entity-id' cannot be empty", () => {
    component.entityId = null;
    component.entityType = 'book';
    expect(() => component.ngOnInit()).toThrowError();
  });

  it("'entity-type' cannot be empty", () => {
    component.entityId = 1;
    component.entityType = null;
    expect(() => component.ngOnInit()).toThrowError();
  });

  it("valid 'entity-type' should not throw error", () => {
    component.entityId = 1;
    component.entityType = 'book';
    expect(() => component.ngOnInit()).not.toThrowError();
    component.entityType = 'hadithtag';
    expect(() => component.ngOnInit()).not.toThrowError();
    // TODO: Implement
    // component.entityType = 'person';
    // expect(() => component.ngOnInit()).not.toThrowError();
  });
});
