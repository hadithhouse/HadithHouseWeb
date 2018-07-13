import * as $ from 'jquery';
import * as _ from 'lodash';

import {
  Component, ElementRef, EventEmitter,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {
  HadithTag,
  HadithTagApiService
} from '../../services/hadith-tag-api.service';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Component({
  selector: 'hh-entity-selector',
  templateUrl: './entity-selector.component.html',
  styleUrls: ['./entity-selector.component.css']
})
export class EntitySelectorComponent implements OnInit {
  @Input('mode') selectionMode: 'single' | 'multi';
  @Input('ids') entitiesIds: number[];
  @Output('selection-changed') selectionChanged =
    new EventEmitter<number[]>();
  entities: HadithTag[];
  @ViewChild('autoCompleteDropDown') autoCompleteDropDown: ElementRef;
  @ViewChild('input') input: ElementRef;
  text: string;
  autoCompleteEntries: any[];

  constructor(private hadithTagApi: HadithTagApiService) {
  }

  ngOnInit() {
    if (!this.selectionMode) {
      this.selectionMode = 'multi';
    }
    if (!this.entitiesIds || this.entitiesIds.length === 0) {
      this.entitiesIds = [];
      this.entities = [];
    } else {
      if (this.selectionMode === 'single' && this.entitiesIds.length > 1) {
        throw new Error("'ids' input has more than one ID while selection " +
          "mode is 'single'.");
      }
      this.fetchEntities();
    }
  }

  private fetchEntities() {
    this.hadithTagApi.query({
      id: this.entitiesIds.join(',')
    }).subscribe(response => {
      this.entities = response.results;
    });
  }

  textChanged() {
    if (this.text && this.text.length > 2) {
      this.findEntities(this.text).subscribe((tags) => {
        this.showAutoComplete(tags, this.text);
      });
    } else {
      this.hideAutoComplete();
    }
  }

  onKey(event: KeyboardEvent) {
    switch (event.which) {
      case 8:
        this.onBackspace();
        break;

      case 13:
        this.onEnter();
        break;
    }
  }

  deleteEntity(index: number) {
    if (index < 0) {
      throw new Error('Index must not be negative.');
    }
    if (index >= this.entities.length) {
      throw new Error('Index out of range.');
    }
    this.entities.splice(index, 1);
    this.selectionChanged.emit(this.entities.map(x => x.id));
  }

  addEntity(entity: any) {
    if (entity.id === 'create-entity') {
      // Special case for when the entity being selected doesn't exist and
      // we have to create it first.
      const newEntity = new HadithTag();
      newEntity.name = entity.name;
      this.hadithTagApi.post(newEntity).subscribe(x => {
        this.addEntity(x);
      });
      return;
    } else if (_.some(this.entities, x => x.id === entity.id)) {
      return;
    }

    if (this.selectionMode === 'single') {
      this.entities = [entity];
      this.text = '';
    } else if (this.selectionMode === 'multi') {
      this.entities.push(entity);
      this.text = '';
    } else {
      throw new Error('Unreachable code');
    }
    this.selectionChanged.emit(this.entities.map(x => x.id));
    this.hideAutoComplete();
  }

  private findEntities(query): Observable<HadithTag[]> {
    return this.hadithTagApi.query({search: query})
      .pipe(map(x => x.results));
  }

  private autoCompleteSuggestionsContains(entities: HadithTag[], query) {
    return _.some(entities.map(e => (<HadithTag>e).name),
      name => name === query);
  }

  private showAutoComplete(entities: HadithTag[], originalQuery) {
    this.autoCompleteEntries = entities;
    if (this.autoCompleteEntries.length === 0 ||
      !this.autoCompleteSuggestionsContains(entities, originalQuery)) {
      this.autoCompleteEntries.push({
        id: 'create-entity',
        name: originalQuery,
        toString: () => {
          return `Create: ${originalQuery}`;
        }
      });
    }

    // Remove entities already added.
    this.autoCompleteEntries = _.filter(this.autoCompleteEntries, x => {
      return !_.some(this.entities, y => y.id === x.id);
    });

    $(this.autoCompleteDropDown.nativeElement).dropdown('toggle');
    $('.dropdown-menu', this.autoCompleteDropDown.nativeElement).show();
    console.log('showAutoComplete() was called');
  }

  private hideAutoComplete() {
    $('.dropdown-menu', this.autoCompleteDropDown.nativeElement).hide();
    console.log('hideAutoComplete() was called');
  }

  private isInputEmpty(): boolean {
    return typeof(this.text) === 'undefined' || this.text === null ||
      this.text === '';
  }

  private onBackspace() {
    if (this.isInputEmpty() && this.entities.length > 0) {
      this.entities.pop();
      this.selectionChanged.emit(this.entities.map(x => x.id));
    }
  }

  private onEnter() {
    if (!this.isInputEmpty()) {
      this.addEntity(this.text);
    }
  }
}
