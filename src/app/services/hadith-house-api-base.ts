import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Observer} from 'rxjs/internal/types';
import {Hadith} from './hadith-api.service';

export class Entity {
// tslint:disable:variable-name
  public id: number;
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
  public set(entity: Entity) {
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
   */
  public equals(entity: Entity): boolean {
    return false;
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

export abstract class RestApi<TEntity extends Entity> {
  abstract getUrl(id: number | string): string;
  abstract get httpClient(): HttpClient;

  protected constructor(private entityClass: new(...params: any[]) => TEntity) {
  }

  /**
   * Retrieves the entities having the given IDs.
   * @param id The ID of the entity to retrieve.
   * @returns An observable for the entity to be retrieved.
   */
  public get(id: number | string): Observable<TEntity> {
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

  /**
   * Retrieves entities based on the given query. The query is simply passed
   * as query parameters to the API, so whatever the API supports can be
   * passed in this dictionary.
   * @param query A dictionary of search query.
   * @returns {Observable<TEntity[]>} An observable for the queried entities.
   */
  public query(query: any): Observable<PagedResults<TEntity>> {
    const url = this.getUrl(null);
    return this.httpClient.get<PagedResults<TEntity>>(url, {params: query});
  }

  public post(entity: TEntity): Observable<TEntity> {
    const url = this.getUrl(null);
    return this.httpClient.post<TEntity>(url, entity);
  }

  public put(entity: TEntity): Observable<TEntity> {
    const url = this.getUrl(null);
    return this.httpClient.put<TEntity>(url, entity);
  }

  public delete(id: number): Observable<void> {
    const url = this.getUrl(id);
    return this.httpClient.delete<void>(url);
  }
}

