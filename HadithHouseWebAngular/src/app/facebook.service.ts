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
import {Observable} from 'rxjs/Observable';
import {getFbAccessToken, isFbSdkLoaded} from '../fbauth';
import {NextObserver} from 'rxjs/Observer';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    FB: any;
    fbUserId: any;
  }
}

export class FacebookUser {
  public id: number;
  public link: string;
  public picture: { data: { url: string } };
}

@Injectable()
export class FacebookService {
  private fbUserId: number;
  private FB: any;

  constructor() {
    this.FB = window.FB;
    if (isFbSdkLoaded()) {
      this.fbUserId = window.fbUserId;
    } else {
      this.fbUserId = null;
    }
  }

  private static verifyFacebookSdkLoaded(): void {
    if (!isFbSdkLoaded()) {
      throw new Error('Cannot login because Facebook SDK couldn\'t be ' +
        'loaded. This is most probably due to a plugin in your browser, e.g. ' +
        'AdBlocker or Ghostery, blocking requests to social websites. ' +
        'Disable blocking for this website and try again.');
    }
  }

  /**
   * Makes an FB request to retrieve info about the current logged in user.
   * @returns An observable delivering the user info object.
   */
  public getLoggedInUser(): Observable<FacebookUser> {
    FacebookService.verifyFacebookSdkLoaded();

    return Observable.create((observer: NextObserver<FacebookUser>) => {
      if (getFbAccessToken() === null) {
        // No access token, so user is not logged in.
        observer.next(null);
        observer.complete();
      }

      this.FB.api('/me', {fields: 'link,picture'}, (response) => {
          if (response.error) {
            observer.error(response.error);
            observer.complete();
          } else {
            observer.next(response);
            observer.complete();
          }
        }
      );
    });
  }
}

