import {Component, Injectable, Input} from '@angular/core';

@Component({selector: 'fa-icon', template: ''})
export class FaIconComponentStub {
  @Input('icon') icon: any;
}

@Injectable()
export class AuthServiceStub {
  loggedInUserHasPermission(permissionName: string) {
    return true;
  }
}
