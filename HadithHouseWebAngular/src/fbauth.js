var fbAccessToken = null;
var fbFetchedLoginStatus = false;
var fbSdkLoaded = false;

function setFbAccessToken(token) {
  fbAccessToken = token;
}

// This function is used in TypeScript code.
/**
 * Returns the Facebook access token for the current user.
 * @returns {string} The Facebook acess tokne for the current user or null.
 */
function getFbAccessToken() {
  return fbAccessToken;
}

/**
 * Sets a flag indicating the status of fetching the login status. This is either true or false, true indicating
 * that we succeeded in fetching the login user, false otherwise.
 * @param {boolean} status The status fetching the login user.
 */
function setFbLoginFetchStatus(status) {
  fbFetchedLoginStatus = status;
}

// This function is used in TypeScript code.
/**
 * Returns a flag indicating the status of fetching the login status. This is either true or false, true indicating
 * that we succeeded in fetching the login user, false otherwise.
 * @returns {boolean} A true/false flag indicating the status of fetching the login status.
 */
function isFbLoginStatusFetched() {
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
 * Returns a flag indicating whethre fB SDK was loaded successfully or not.
 * @returns {boolean} True or false.
 */
function isFbSdkLoaded() {
  return fbSdkLoaded;
}

window.fbAsyncInit = function () {
  FB.init({
    appId: '{{ appId }}',
    xfbml: true,
    version: 'v2.4'
  });

  fbSdkLoadingSucceeded();
};

function fbSdkLoadingSucceeded() {
  setFbSdkLoaded(true);

  FB.getLoginStatus(function (response) {
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

    SystemJS.import('app').then(function () {
      angular.bootstrap(document.body, ['HadithHouseApp']);
    });
  });
}

function fbSdkLoadingFailed() {
  // We failed to load Facebook's SDK
  setFbSdkLoaded(false);

  setFbLoginFetchStatus(false);
  setFbAccessToken(null);
  SystemJS.import('app').then(function () {
    angular.bootstrap(document.body, ['HadithHouseApp']);
  });
}

(function (d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "https://connect.facebook.net/en_US/sdk.js";
  js.onerror = function () {
    fbSdkLoadingFailed();
  };
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
