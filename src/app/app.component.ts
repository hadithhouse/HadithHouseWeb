// Low level imports
import * as _ from 'lodash';
import * as toastr from 'toastr';
import 'bootstrap';

// Angular & RxJS imports
import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {debounceTime, timeout} from 'rxjs/operators';

import {faSyncAlt} from '@fortawesome/free-solid-svg-icons';

// HadithHouse imports
import {FacebookService, IFbMeResponse} from './facebook.service';
import {LoadingStatusHttpInterceptor} from './http-interceptors';

/**
 * Identifies a tab in the home page.
 */
interface ITab {
  /**
   * The name of the tab, e.g. Hadiths
   */
  name: string;

  /**
   * The relative path of the tab, e.g. /hadiths
   */
  urlPath: string;

  /**
   * Whether the tab is selected or not.
   */
  selected: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  faSyncAlt = faSyncAlt;

  constructor(private facebookService: FacebookService,
              private router: Router,
              private loadingStatusInterceptor: LoadingStatusHttpInterceptor,
              private changeDetector: ChangeDetectorRef) {
  }

  isLoginStatusFetched = false;

  /**
   * The FB access token of the currently logged in user, if there is any.
   */
  fbAccessToken: string = null;

  /**
   * The FB user ID of the currently logged in user, if there is any.
   */
  fbUserId: string = null;

  /**
   * Basic information about the currently logged in user, like picture URL,
   * etc., if there is any.
   * @type {null}
   */
  fbUserInfo: {
    id: number,
    profilePicUrl: string,
    link: string
  } = null;

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
  showSpinner = false;

  ngOnInit() {
    this.subscribeToLoadingStatusInterceptor();
    this.initFbSdk();
  }

  private initFbSdk() {
    this.facebookService.init().subscribe(next => {
      console.log('FB SDK successfully initialized.');
      this.fbGetLoginStatus();
    }, () => {
      console.error('Failed to load FB SDK. This is most probably due to a ' +
        'plugin in your browser, e.g. AdBlocker or Ghostery, blocking ' +
        'requests to social websites. Disable blocking for this website ' +
        'and try again.');
    });
  }

  private fbSetUser(accessToken: string, userId: string) {
    this.fbAccessToken = accessToken;
    this.fbUserId = userId;
    if (this.fbUserId !== null) {
      this.fetchUserInfo();
    }
    else {
      this.fbUserInfo = null;
    }
  }

  private fbGetLoginStatus() {
    this.facebookService.getLoginStatus().pipe(timeout(5000)).subscribe(
      loginStatus => {
        this.isLoginStatusFetched = true;
        if (loginStatus.status === 'connected') {
          // The user is logged in to Facebook and has authenticated
          // the application.
          this.fbSetUser(loginStatus.authResponse.accessToken,
            loginStatus.authResponse.userID);
        } else if (loginStatus.status === 'not_authorized') {
          // The user is logged in to Facebook, but has not authenticated
          // the application.
          this.fbSetUser(null, null);
        } else {
          // The user isn't logged in to Facebook.
          this.fbSetUser(null, null);
        }
        this.changeDetector.detectChanges();
      },
      error => {
        console.error("Couldn't fetch login status.");
        this.isLoginStatusFetched = false;
        this.changeDetector.detectChanges();
      });
  }

  fbLogin(): void {
    if (!this.facebookService.isFbSdkLoaded()) {
      toastr.error('Cannot login because Facebook SDK couldn\'t be loaded.' +
        ' This is most probably due to a plugin in your browser, e.g. ' +
        'AdBlocker or Ghostery, blocking requests to social websites. ' +
        'Disable blocking for this website and try again.');
      return;
    }

    this.facebookService.login().subscribe(
      (response) => {
        console.error('User logged in with Facebook.');
        if (response.authResponse) {
          if (response.status === 'connected') {
            this.fbSetUser(response.authResponse.accessToken,
              response.authResponse.userID);
          }
        } else {
          console.log('User cancelled login.');
        }
        this.changeDetector.detectChanges();
      },
      (error) => {
        console.error('Failed to login to Facebook. Error: ' + error);
      }
    );
  }

  fbLogout(): void {
    if (!this.facebookService.isFbSdkLoaded()) {
      toastr.error('Cannot login because Facebook SDK couldn\'t be loaded.' +
        ' This is most probably due to a plugin in your browser, e.g. ' +
        'AdBlocker or Ghostery, blocking requests to social websites. ' +
        'Disable blocking for this website and try again.');
      return;
    }

    this.facebookService.logout().subscribe(
      (/*response*/) => {
        console.log('User logged out.');
        this.fbSetUser(null, null);
        this.changeDetector.detectChanges();
      });
  }

  /**
   * Called to fetch the user information if a user is logged in.
   */
  private fetchUserInfo(): void {
    this.facebookService.getLoggedInUser().subscribe(
      (user: IFbMeResponse) => {
        if (user === null) {
          this.fbUserInfo = null;
        } else {
          this.fbUserInfo = {
            id: user.id,
            link: user.link,
            profilePicUrl: user.picture.data.url
          };
        }
        this.changeDetector.detectChanges();
      },
      (error: any) => {
        console.error('Failed to fetch logged in user. Error: ' +
          JSON.stringify(error));
        this.fbUserInfo = null;
        this.changeDetector.detectChanges();
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

  private subscribeToLoadingStatusInterceptor() {
    this.loadingStatusInterceptor.isLoadingObservable()
      .pipe(debounceTime(100))
      .subscribe(showSpinner => {
        this.showSpinner = showSpinner;
      });
  }

  search() {
    throw new Error('Not implemented yet');
  }

  /**
   * Changes the currently selected tab.
   * @param {ITab} tab The tab to select.
   */
  changeTab(tab: ITab) {
    _.each(this.tabs, (i) => i.selected = false);
    this.router.navigate([tab.urlPath]);
    this.selectedTab = tab;
  }
}
