/**
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Rafid Khalid Al-Humaimidi
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import {Injectable} from '@angular/core';
import {Observable, Observer} from 'rxjs';
import {environment} from '../environments/environment';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    FB: any;
  }
}

export interface IFbMeResponse {
  id: number;
  link: string;
  picture: { data: { url: string } };
}

export interface IFbAuthResponse {
  accessToken: string;
  expiresIn: number;
  signedRequest: string;
  userID: string;
  grantedScopes?: string;
}

export interface IFbLoginStatus {
  status: string;
  authResponse: IFbAuthResponse;
}

@Injectable()
export class FacebookService {
  private FB: any = null;
  private fbSdkLoaded = false;

  public isFbSdkLoaded() {
    return this.fbSdkLoaded;
  }

  /**
   * Verifies that Facebook SDK is loaded. If it is not, an exception is thrown.
   */
  private verifyFacebookSdkLoaded(): void {
    if (!this.isFbSdkLoaded()) {
      throw new Error('Cannot login because Facebook SDK couldn\'t be ' +
        'loaded. This is most probably due to a plugin in your browser, e.g. ' +
        'AdBlocker or Ghostery, blocking requests to social websites. ' +
        'Disable blocking for this website and try again.');
    }
  }

  /**
   * Initializes the service. This essentially loads the FB JS SDK.
   * @returns {Observable<true>} An observable for watching the initialization.
   */
  public init(): Observable<true> {
    return Observable.create((observer: Observer<true>) => {
      // FB SDK calls this function if it succeeds.
      (<any>window).fbAsyncInit = () => {
        this.FB = window.FB;
        this.FB.init({
          appId: environment.fbAppId,
          xfbml: true,
          version: 'v2.8'
        });

        this.fbSdkLoaded = true;
        observer.next(true);
        observer.complete();
      };

      ((d, s, id) => {
        let js;
        const fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
          return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://connect.facebook.net/en_US/sdk.js';
        // This handler is useful if we fail to load FB's sdk.js file, e.g. if
        // there is an AD blocker in the browser.
        js.onerror = () => {
          this.fbSdkLoaded = false;
          observer.error('Failed to load FB SDK. This is most probably due ' +
            'to a plugin in your browser, e.g. AdBlocker or Ghostery, ' +
            'blocking requests to social websites. Disable blocking for this ' +
            'website and try again.');
        };
        fjs.parentNode.insertBefore(js, fjs);
      })(document, 'script', 'facebook-jssdk');
    });
  }

  /**
   * Logs in the current user with FB.
   * @returns {Observable<any>} An observable for when logging in happens.
   */
  public login(): Observable<IFbLoginStatus> {
    this.verifyFacebookSdkLoaded();

    return Observable.create((observer: Observer<IFbAuthResponse>) => {
      this.FB.login(response => {
        observer.next(response);
        observer.complete();
      });
    });
  }

  /**
   * Logs out the current logged in FB user.
   * @returns {Observable<any>} An observable for when logging out happens.
   */
  public logout(): Observable<any> {
    this.verifyFacebookSdkLoaded();

    return Observable.create((obs: Observer<string>) => {
      this.FB.logout(response => {
        obs.next(response);
        obs.complete();
      });
    });
  }

  /**
   *
   * @returns {Observable<IFbLoginStatus>}
   */
  public getLoginStatus(): Observable<IFbLoginStatus> {
    return Observable.create((observer: Observer<IFbLoginStatus>) => {
      this.FB.getLoginStatus((response: IFbLoginStatus) => {
        observer.next(response);
        observer.complete();
      });
    });
  }

  /**
   * Makes an FB request to retrieve info about the current logged in user.
   * @returns An observable delivering the user info object.
   */
  public getLoggedInUser(): Observable<IFbMeResponse> {
    this.verifyFacebookSdkLoaded();

    return Observable.create((observer: Observer<IFbMeResponse>) => {
      this.FB.api('/me', {fields: 'link,picture'}, (response) => {
          if (response.error) {
            observer.error(response.error);
          } else {
            observer.next(response);
            observer.complete();
          }
        }
      );
    });
  }
}

