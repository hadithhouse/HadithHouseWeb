import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import 'bootstrap';
import {getFbAccessToken, isFbLoginStatusFetched} from '../fbauth';
import {FacebookService, FacebookUser} from './facebook.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private facebookService: FacebookService) {
  }

  selectedTab = null;

  fbUser: {
    id: number,
    profilePicUrl: string,
    link: string
  } = null;

  isFbLoginStatusFetched = isFbLoginStatusFetched();
  fbAccessToken = getFbAccessToken();

  tabs = [
    {name: 'Hadiths', urlPath: 'hadiths', selected: false},
    {name: 'Books', urlPath: 'books', selected: false},
    {name: 'Persons', urlPath: 'persons', selected: false},
    {name: 'Tags', urlPath: 'hadithtags', selected: false},
    {name: 'Users', urlPath: 'users', selected: false}
  ];

  ngOnInit() {
    this.facebookService.getLoggedInUser().subscribe((user: FacebookUser) => {
      this.fbUser = {
        id: user.id,
        link: user.link,
        profilePicUrl: user.picture.data.url
      };
    });
  }

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
