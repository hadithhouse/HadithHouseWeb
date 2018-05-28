import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';

export class Entity {
// tslint:disable:variable-name
  public id: number;
  public added_by: number;
  public updated_by: number;
  public added_on: string;
  public updated_on: string;
  public valid: boolean = null;
// tslint:enable:variable-name
}

export class Hadith extends Entity {
// tslint:disable:variable-name
  public text: string;
  public person: number;
  public book: number;
  public volume: number;
  public chapter: number;
  public section: number;
  public tags: number[];
// tslint:enable:variable-name
}

export class Book extends Entity {
// tslint:disable:variable-name
  public title: string;
  public brief_desc: string;
  public pub_year: number;
// tslint:enable:variable-name
}

export class HadithTag extends Entity {
  public name: string;
}

export class User extends Entity {
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

export abstract class RestApi<TEntity, TId> {
  abstract getUrl(id: TId): string;
  abstract get httpClient(): HttpClient;

  /**
   * Retrieves the entities having the given IDs.
   * @param id The ID of the entity to retrieve.
   * @returns An observable for the entity to be retrieved.
   */
  public get(id: TId): Observable<TEntity> {
    const url = this.getUrl(id);
    return this.httpClient.get<TEntity>(url);
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
    super();
  }

  getUrl(id: 'current'|number): string {
    return environment.apisUrl + 'users/' + id;
  }

  get httpClient(): HttpClient {
    return this._httpClient;
  }
}

@Injectable()
export class HadithTagService extends RestApi<HadithTag, number> {
  constructor(private _httpClient: HttpClient) {
    super();
  }

  getUrl(id: number): string {
    return environment.apisUrl + 'hadithtags/' + id;
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
