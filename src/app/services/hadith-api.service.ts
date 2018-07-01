import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Entity, RestApi} from './hadith-house-api-base';
import * as _ from 'lodash';
import {environment} from '../../environments/environment';
import {HadithTag} from './hadith-tag-api.service';

export class Hadith extends Entity {
// tslint:disable:variable-name
  public text: string;
  public person: number;
  public book: number;
  public volume: number;
  public chapter: number;
  public section: number;
  public tags: (number | HadithTag)[];

// tslint:enable:variable-name

  public set(entity: Entity) {
    super.set(entity);
    const casted = <Hadith>entity;
    this.text = casted.text;
    this.person = casted.person;
    this.book = casted.book;
    this.volume = casted.volume;
    this.chapter = casted.chapter;
    this.section = casted.section;
    this.tags = casted.tags.slice();
  }

  public equals(entity: Entity): boolean {
    const casted = <Hadith>entity;
    return this.id === casted.id &&
      this.text === casted.text &&
      this.person === casted.person &&
      this.book === casted.book &&
      this.volume === casted.volume &&
      this.chapter === casted.chapter &&
      this.section === casted.section &&
      _.isEqual(this.tags.slice().sort(), casted.tags.slice().sort());
  }
}

@Injectable()
export class HadithApiService extends RestApi<Hadith> {
  constructor(private _httpClient: HttpClient) {
    super(Hadith);
  }

  getUrl(id: number | string): string {
    if (id === null) {
      return environment.apisUrl + 'hadiths/';
    } else {
      return environment.apisUrl + 'hadiths/' + id;
    }
  }

  get httpClient(): HttpClient {
    return this._httpClient;
  }
}
