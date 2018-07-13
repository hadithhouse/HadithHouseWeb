import {async, ComponentFixture, inject, TestBed} from '@angular/core/testing';

import {EntitySelectorComponent} from './entity-selector.component';
import {of} from 'rxjs/internal/observable/of';
import {
  HadithTag,
  HadithTagApiService
} from '../../services/hadith-tag-api.service';
import {FormsModule} from '@angular/forms';

describe('EntitySelectorComponent', () => {
  let component: EntitySelectorComponent;
  let fixture: ComponentFixture<EntitySelectorComponent>;

  function mockHadithTagApiService(): any {
    const hadithApi = jasmine.createSpyObj('HadithTagApiService',
      ['get', 'query']);
    hadithApi.get.and.returnValue(of(new HadithTag()));
    hadithApi.query.and.returnValue(of(new HadithTag()));
    return hadithApi;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        EntitySelectorComponent
      ],
      providers: [
        {
          provide: HadithTagApiService,
          useValue: mockHadithTagApiService()
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("'single' mode doesn't allow more than one ID", () => {
    component.selectionMode = 'single';

    component.entitiesIds = [1];
    expect(() => component.ngOnInit()).not.toThrowError();

    component.entitiesIds = [1, 2];
    expect(() => component.ngOnInit()).toThrowError();
  });

  it("'multi' mode allows more than one ID", () => {
    component.selectionMode = 'multi';

    component.entitiesIds = [1];
    expect(() => component.ngOnInit()).not.toThrowError();

    component.entitiesIds = [1, 2];
    expect(() => component.ngOnInit()).not.toThrowError();
  });

  it('Not passing IDs causes query() on HadithTagApiService not to be called.',
    inject([HadithTagApiService], (hadithTagApi: HadithTagApiService) => {
      component.selectionMode = 'multi';
      component.entitiesIds = [];
      component.ngOnInit();
      expect(hadithTagApi.query).not.toHaveBeenCalled();
    }));

  it('Passing IDs causes query() on HadithTagApiService to be called.',
    inject([HadithTagApiService], (hadithTagApi: HadithTagApiService) => {
    component.selectionMode = 'multi';
    component.entitiesIds = [1, 3, 100];
    component.ngOnInit();
    expect(hadithTagApi.query).toHaveBeenCalledWith({
      id: component.entitiesIds .join(',')
    });
  }));
});
