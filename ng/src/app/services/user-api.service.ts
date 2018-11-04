import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Entity, RestApi} from './hadith-house-api-base';

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

  public set(entity: Entity) {
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
 * A service for interacting with Hadith House's users service.
 */
@Injectable()
export class UserApiService extends RestApi<User> {
  constructor(private _httpClient: HttpClient) {
    super(User);
  }

  getUrl(id: number | string): string {
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
