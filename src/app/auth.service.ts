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
import {User} from './hadith-house-api.service';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

@Injectable()
export class AuthService {
  // TODO: Create setters and getters for those properties.

  /**
   * If true, it indicates that login status (whether the user is logged in
   * or not) is fetched or not. Unless there is an error where communicating
   * with FD SDK, this should be true.
   * @type {boolean}
   */
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

  /**
   * Hadith House User object for the currently logged in user.
   */
  user: User = null;

  /**
   * Checks whether the currently logged in user has the given permission. If
   * no user is logged in, this returns false.
   * @param {string} permissionName The name of the permission to check for.
   * @returns {boolean} True or false.
   */
  loggedInUserHasPermission(permissionName: string) {
    if (this.user === null) {
      return false;
    }
    return this.user.hasPermission(permissionName);
  }
}

