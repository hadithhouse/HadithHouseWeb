import {Component, Input, OnInit} from '@angular/core';
import {
  HadithTagApiService
} from '../../services/hadith-tag-api.service';
import {Observable} from 'rxjs/internal/Observable';
import {Entity, RestApi} from '../../services/hadith-house-api-base';
import {map} from 'rxjs/operators';
import {BookApiService} from '../../services/book-api.service';

@Component({
  selector: 'hh-entity-label',
  templateUrl: './entity-label.component.html',
  styleUrls: ['./entity-label.component.css']
})
export class EntityLabelComponent implements OnInit {
  @Input('entity-id') entityId: number;
  @Input('entity-type') entityType: 'book' | 'hadithtag' | 'person' | '';
  entity: Observable<Entity>;
  entityRepr: Observable<string>;
  private entityApi: RestApi<Entity>;

  constructor(private hadithTagApi: HadithTagApiService,
              private bookApi: BookApiService) {
  }

  ngOnInit() {
    if (!this.entityId) {
      debugger;
      throw new Error("'id' must be specified when using <hh-entity-label>.");
    }
    if (!this.entityType) {
      throw new Error("'type' must be specified when using <hh-entity-label>.");
    }
    if (this.entityType === 'book') {
      this.entityApi = this.bookApi;
    } else if (this.entityType === 'hadithtag') {
      this.entityApi = this.hadithTagApi;
    } else if (this.entityType === 'person') {
      throw new Error('Not supported yet!');
    } else {
      throw new Error('Invalid entity type.');
    }

    this.fetchEntity();
  }

  private fetchEntity() {
    this.entity = this.entityApi.get(this.entityId);
    this.entityRepr = this.entity.pipe(map(e => e.toString()));
  }
}
