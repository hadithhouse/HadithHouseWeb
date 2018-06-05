import * as _ from 'lodash';

import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {Observer} from 'rxjs/internal/types';

export class Entity<TId> {
// tslint:disable:variable-name
  public id: TId;
  public added_by: number;
  public updated_by: number;
  public added_on: string;
  public updated_on: string;
  public valid: boolean = null;
// tslint:enable:variable-name

  /**
   * Sets the values of this entity to the values of the given entity.
   * @param entity The entity to copy values from.
   */
  public set(entity: Entity<TId>) {
    this.id = entity.id;
    this.added_by = entity.added_by;
    this.updated_by = entity.updated_by;
    this.added_on = entity.added_on;
    this.updated_on = entity.updated_on;
  }

  /**
   * Base function for comparing an entity against another one.
   *
   * When overriding this function make sure you also check the id which is
   * defined in this class, i.e. the base Entity class. The reason it is not
   * compared here is we want to make sure this function returns false by
   * default. Otherwise, if an entity class misses the implementation of this
   * function, it will always return true when the user edits an element,
   * making it impossible to save an entity because it will be considered
   * unchanged.
   *
   * @param entity The entity to compare against.
   * @returns {boolean} True or false depending on the comparison result.
   * @template TId The type of the ID.
   */
  public equals(entity: Entity<TId>): boolean {
    return false;
  }
}

export class Hadith extends Entity<number> {
// tslint:disable:variable-name
  public text: string;
  public person: number;
  public book: number;
  public volume: number;
  public chapter: number;
  public section: number;
  public tags: number[];
// tslint:enable:variable-name

  public set(entity: Entity<number>) {
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

  public equals(entity: Entity<number>): boolean {
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

export class Book extends Entity<number> {
// tslint:disable:variable-name
  public title: string;
  public brief_desc: string;
  public pub_year: number;
// tslint:enable:variable-name

  public set(entity: Entity<number>) {
    super.set(entity);
    const casted = <Book>entity;
    this.title = casted.title;
    this.brief_desc = casted.brief_desc;
    this.pub_year = casted.pub_year;
  }

  public equals(entity: Entity<number>) {
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

export class HadithTag extends Entity<number> {
  public name: string;

  public set(entity: Entity<number>) {
    super.set(entity);
    this.name = (<HadithTag>entity).name;
  }

  public equals(entity: Entity<number>) {
    const casted = <HadithTag>entity;
    return this.id === casted.id &&
      this.name === casted.name;
  }

  public toString(): string {
    if (this.name) {
      return this.name;
    }
    return null;
  }
}

export class User extends Entity<number> {
// tslint:disable:variable-name
  public name: string;
  public first_name: string;
  public last_name: string;
  public is_superuser: boolean;
  public is_staff: boolean;
  public username: string;
  public date_joined: string;
  public permissions: string[];
  public permissionsOrdered: string[];
// tslint:enable:variable-name

  public set(entity: Entity<number>) {
    super.set(entity);
    this.first_name = (<User>entity).first_name;
    this.last_name = (<User>entity).last_name;
    this.is_superuser = (<User>entity).is_superuser;
    this.is_staff = (<User>entity).is_staff;
    this.username = (<User>entity).username;
    this.date_joined = (<User>entity).date_joined;
    this.permissions = (<User>entity).permissions.slice();
    this.permissionsOrdered = (<User>entity).permissionsOrdered
      ? (<User>entity).permissionsOrdered.slice()
      : null;
  }

  public hasPermission(permission: string) {
    if (!this.permissions) {
      return false;
    }
    return this.permissions.includes(permission);
  }

  public toString(): string {
    if (this.first_name && this.last_name) {
      return `${this.first_name} ${this.last_name}`;
    } else if (this.first_name) {
      return `${this.first_name}`;
    } else if (this.last_name) {
      return `${this.first_name}`;
    }
    return null;
  }
}

/**
 * Data contract for paged results returned from Hadith House API (Django).
 */
export class PagedResults<TEntity> {
  /**
   * The total number of results.
   */
  public count: number;

  /**
   * The URL to retrieve the next set of results.
   */
  public next: string;

  /**
   * The URL to retrieve the previous set of results.
   */
  public previous: string;

  /**
   * An array containing the results.
   */
  public results: TEntity[];
}

export abstract class RestApi<TEntity extends Entity<TId>, TId> {
  abstract getUrl(id: TId): string;
  abstract get httpClient(): HttpClient;

  protected constructor(private entityClass: new(...params: any[]) => TEntity) {
  }

  /**
   * Retrieves the entities having the given IDs.
   * @param id The ID of the entity to retrieve.
   * @returns An observable for the entity to be retrieved.
   */
  public get(id: TId): Observable<TEntity> {
    const url = this.getUrl(id);
    return Observable.create((observer: Observer<TEntity>) => {
      this.httpClient.get<TEntity>(url).subscribe(entity => {
        const entity2 = new this.entityClass();
        entity2.set(entity);
        observer.next(entity2);
        observer.complete();
      }, error => {
        observer.error(error);
      });
    });
  }

  public post(entity: TEntity): Observable<TEntity> {
    const url = this.getUrl(null);
    return this.httpClient.post<TEntity>(url, entity);
  }

  public put(entity: TEntity): Observable<TEntity> {
    const url = this.getUrl(null);
    return this.httpClient.put<TEntity>(url, entity);
  }

  public delete(id: TId): Observable<void> {
    const url = this.getUrl(id);
    return this.httpClient.delete<void>(url);
  }
}

/**
 * A service for interacting with Hadith House's users service.
 */
@Injectable()
export class UserService extends RestApi<User, 'current'|number> {
  constructor(private _httpClient: HttpClient) {
    super(User);
  }

  getUrl(id: 'current'|number): string {
    if (id === null) {
      return environment.apisUrl + 'users/';
    } else {
      return environment.apisUrl + 'users/' + id;
    }
  }

  get httpClient(): HttpClient {
    return this._httpClient;
  }
}

@Injectable()
export class HadithTagService extends RestApi<HadithTag, number> {
  constructor(private _httpClient: HttpClient) {
    super(HadithTag);
  }

  getUrl(id: number): string {
    if (id === null) {
      return environment.apisUrl + 'hadithtags/';
    } else {
      return environment.apisUrl + 'hadithtags/' + id;
    }
  }

  get httpClient(): HttpClient {
    return this._httpClient;
  }

}

@Injectable()
export class HadithHouseApiService {

  constructor(private httpClient: HttpClient) {
  }

  /**
   * Retrieves a random hadith.
   * @returns {Observable<Hadith>} An observable for the hadith.
   */
  public getRandomHadith(): Observable<Hadith> {
    const url = environment.apisUrl + 'hadiths/random';

    return this.httpClient.get<Hadith>(url);
  }

  /**
   * Retrieves hadiths based on the given query. The query is simply passed
   * as query parameters to the API, so whatever the API supports can be
   * passed in this dictionary.
   * @param query A dictionary of search query.
   * @returns {Observable<Hadith[]>}
   */
  public getHadiths(query: any): Observable<PagedResults<Hadith>> {
    const url = environment.apisUrl + 'hadiths';
    return this.httpClient.get<PagedResults<Hadith>>(url, {params: query});
  }

  /**
   * Retrieves books based on the given query. The query is simply passed
   * as query parameters to the API, so whatever the API supports can be
   * passed in this dictionary.
   * @param query A dictionary of search query.
   * @returns {Observable<Hadith[]>}
   */
  public getBooks(query: any): Observable<PagedResults<Book>> {
    const url = environment.apisUrl + 'books';
    return this.httpClient.get<PagedResults<Book>>(url);
  }

  /**
   * Retrieves hadith tags based on the given query. The query is simply passed
   * as query parameters to the API, so whatever the API supports can be
   * passed in this dictionary.
   * @param query A dictionary of search query.
   * @returns {Observable<Hadith[]>}
   */
  public getHadithTags(query: any): Observable<PagedResults<HadithTag>> {
    const url = environment.apisUrl + 'hadithtags';
    return this.httpClient.get<PagedResults<HadithTag>>(url);
  }
}
