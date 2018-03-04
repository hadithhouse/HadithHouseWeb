import {Component} from '@angular/core';
import * as _ from 'lodash';
import 'bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTab = null;

  fbUser = {
    profilePicUrl: null,
    link: null
  };

  isFbLoginStatusFetched = false;

  tabs = [
    {name: 'Hadiths', urlPath: 'hadiths', selected: false},
    {name: 'Books', urlPath: 'books', selected: false},
    {name: 'Persons', urlPath: 'persons', selected: false},
    {name: 'Tags', urlPath: 'hadithtags', selected: false},
    {name: 'Users', urlPath: 'users', selected: false}
  ];

  search = () => {
    throw new Error('Not implemented yet');
  };

  fbLogin = () => {
    throw new Error('Not implemented yet');
  };

  fbLogout = () => {
    throw new Error('Not implemented yet');
  };

  changeTab = (tab) => {
    _.each(this.tabs, (i) => i.selected = false);
    this.selectedTab = tab;
  };
}
