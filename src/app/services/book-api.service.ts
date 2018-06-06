import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Entity, RestApi} from './hadith-house-api-base';
import {environment} from '../../environments/environment';

export class Book extends Entity {
// tslint:disable:variable-name
  public title: string;
  public brief_desc: string;
  public pub_year: number;

// tslint:enable:variable-name

  public set(entity: Entity) {
    super.set(entity);
    const casted = <Book>entity;
    this.title = casted.title;
    this.brief_desc = casted.brief_desc;
    this.pub_year = casted.pub_year;
  }

  public equals(entity: Entity) {
    const casted = <Book>entity;
    return this.id === casted.id &&
      this.title === casted.title &&
      this.brief_desc === casted.brief_desc &&
      this.pub_year === casted.pub_year;
  }

  public toString(): string {
    if (this.title) {
      return this.title;
    }
    return null;
  }
}

@Injectable()
export class BookApiService extends RestApi<Book> {
  constructor(private _httpClient: HttpClient) {
    super(Book);
  }

  getUrl(id: number | string): string {
    if (id === null) {
      return environment.apisUrl + 'books/';
    } else {
      return environment.apisUrl + 'books/' + id;
    }
  }

  get httpClient(): HttpClient {
    return this._httpClient;
  }
}

