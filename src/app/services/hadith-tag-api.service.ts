import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Entity, RestApi} from './hadith-house-api-base';

export class HadithTag extends Entity {
  public name: string;

  public set(entity: Entity) {
    super.set(entity);
    this.name = (<HadithTag>entity).name;
  }

  public equals(entity: Entity) {
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

@Injectable()
export class HadithTagApiService extends RestApi<HadithTag> {
  constructor(private _httpClient: HttpClient) {
    super(HadithTag);
  }

  getUrl(id: number | string): string {
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

