import {Component, OnInit} from '@angular/core';
import * as _ from 'lodash';
import * as toastr from 'toastr';
import 'bootstrap';
import {
  getFbAccessToken,
  isFbLoginStatusFetched,
  isFbSdkLoaded,
  setFbAccessToken
} from '../fbauth';
import {FacebookService, FacebookUser} from './facebook.service';
import {Router} from '@angular/router';

interface ITab {
  name: string;
  urlPath: string;
  selected: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private facebookService: FacebookService,
              private router: Router) {
  }

  fbUser: {
    id: number,
    profilePicUrl: string,
    link: string
  } = null;

  isFbLoginStatusFetched = isFbLoginStatusFetched();
  fbAccessToken = getFbAccessToken();

  tabs: ITab[] = [
    {name: 'Hadiths', urlPath: 'hadiths', selected: false},
    {name: 'Books', urlPath: 'books', selected: false},
    {name: 'Persons', urlPath: 'persons', selected: false},
    {name: 'Tags', urlPath: 'hadithtags', selected: false},
    {name: 'Users', urlPath: 'users', selected: false},
    {name: 'Home', urlPath: '', selected: false}
  ];
  homeTab = this.tabs[this.tabs.length - 1];
  selectedTab = this.homeTab;

  ngOnInit() {
    this.getUserInfo();
  }

  public search() {
    throw new Error('Not implemented yet');
  }

  public fbLogin(): void {
    if (!isFbSdkLoaded()) {
      toastr.error('Cannot login because Facebook SDK couldn\'t be loaded.' +
        ' This is most probably due to a plugin in your browser, e.g. ' +
        'AdBlocker or Ghostery, blocking requests to social websites. ' +
        'Disable blocking for this website and try again.');
      return;
    }

    this.facebookService.login().subscribe(
      (response) => {
        console.error('User logged in with Facebook.');
        if (response.status === 'connected') {
          this.fbAccessToken = response.authResponse.accessToken;
          setFbAccessToken(response.authResponse.accessToken);
          this.getUserInfo();
        }
      },
      (error) => {
        console.error('Failed to login to Facebook. Error: ' + error);
      }
    );
  }

  public fbLogout(): void {
    if (!isFbSdkLoaded()) {
      toastr.error('Cannot login because Facebook SDK couldn\'t be loaded.' +
        ' This is most probably due to a plugin in your browser, e.g. ' +
        'AdBlocker or Ghostery, blocking requests to social websites. ' +
        'Disable blocking for this website and try again.');
      return;
    }

    this.facebookService.logout().subscribe(
      (/*response*/) => {
        console.log('User logged out.');
        this.fbAccessToken = null;
        setFbAccessToken(null);
      });
  }

  public getUserInfo(): void {
    if (!isFbSdkLoaded()) {
      // Facebook SDK couldn't be loaded, so we set the fbUser to null.
      this.fbUser = null;
      return;
    }

    this.facebookService.getLoggedInUser().subscribe(
      (user: FacebookUser) => {
        if (user === null) {
          this.fbUser = null;
        } else {
          this.fbUser = {
            id: user.id,
            link: user.link,
            profilePicUrl: user.picture.data.url
          };
        }
      },
      (error: any) => {
        console.error('Failed to fetch logged in user. Error: ' +
          JSON.stringify(error));
        this.fbUser = null;
      }
    );

    // To be implemented when we implement user service.
    /*const currentUser = this.userResource.get('current', true);
    currentUser.promise.then(() => {
      const perms = {};
      for (const i in currentUser.permissions) {
        if (currentUser.permissions.hasOwnProperty(i)) {
          perms[currentUser.permissions[i]] = true;
        }
      }
      const user: any = {};
      angular.copy(currentUser, user);
      user.permissions = perms;
      this.$rootScope.user = user;
    });*/
  }

  public changeTab(tab: ITab) {
    _.each(this.tabs, (i) => i.selected = false);
    this.router.navigate([tab.urlPath]);
    this.selectedTab = tab;
  }
}
