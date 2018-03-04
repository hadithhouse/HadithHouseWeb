import {environment} from './environments/environment';

let fbAccessToken = null;
let fbFetchedLoginStatus = false;
let fbSdkLoaded = false;
declare let FB: any;

function setFbAccessToken(token) {
  fbAccessToken = token;
}

// This function is used in TypeScript code.
/**
 * Returns the Facebook access token for the current user.
 * @returns {string} The Facebook access token for the current user or null.
 */
export function getFbAccessToken() {
  return fbAccessToken;
}

/**
 * Sets a flag indicating the status of fetching the login status. This is
 * either true or false, true indicating that we succeeded in fetching the login
 * user, false otherwise.
 * @param {boolean} status The status fetching the login user.
 */
function setFbLoginFetchStatus(status) {
  fbFetchedLoginStatus = status;
}

// This function is used in TypeScript code.
/**
 * Returns a flag indicating the status of fetching the login status. This is
 * either true or false, true indicating that we succeeded in fetching the
 * login user, false otherwise.
 * @returns {boolean} A true/false flag indicating the status of fetching the
 * login status.
 */
export function isFbLoginStatusFetched() {
  return fbFetchedLoginStatus;
}

/**
 * Sets a flag indicating whether FB SDK was loaded successfully or not.
 * @param loaded True or false.
 */
function setFbSdkLoaded(loaded) {
  fbSdkLoaded = loaded;
}

/**
 * Returns a flag indicating whether FB SDK was loaded successfully or not.
 * @returns {boolean} True or false.
 */
export function isFbSdkLoaded() {
  return fbSdkLoaded;
}

/**
 * Called when FB SDK loading succeeds. This will call `FB.getLoginStatus`
 * to retrieve the status of the current user.
 * @param {() => void} callback A callback to call after the user status is
 * fetched.
 */
function fbSdkLoadingSucceeded(callback: () => void) {
  setFbSdkLoaded(true);

  FB.getLoginStatus(response => {
    setFbLoginFetchStatus(true);
    if (response.status === 'connected') {
      // The user is logged in to Facebook and has authenticated
      // the application.
      setFbAccessToken(response.authResponse.accessToken);
    } else if (response.status === 'not_authorized') {
      // The user is logged in to Facebook, but has not authenticated
      // the application.
      setFbAccessToken(null);
    } else {
      // The user isn't logged in to Facebook.
      setFbAccessToken(null);
    }

    callback();
  });
}

/**
 * Called when FB SDK loading fails.
 * @param {() => void} callback A callback to call at the end.
 */
function fbSdkLoadingFailed(callback: () => void) {
  // We failed to load Facebook's SDK
  setFbSdkLoaded(false);
  setFbLoginFetchStatus(false);
  setFbAccessToken(null);

  callback();
}

/**
 * Call this function to initialize FB SDK. This tries to loads FB JS SDK which
 * tries to identify the logged in user and prepare the SDK for use.
 * @param {() => void} successCallback A callback in case of success.
 * @param {() => void} errorCallback A callback in case of failure.
 */
export function initFbSdk(successCallback: () => void,
                          errorCallback: () => void) {
  // FB SDK calls this function if it succeeds.
  (<any>window).fbAsyncInit = () => {
    FB.init({
      appId: environment.fbAppId,
      xfbml: true,
      version: 'v2.4'
    });

    fbSdkLoadingSucceeded(successCallback);
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
      fbSdkLoadingFailed(errorCallback);
    };
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
}
