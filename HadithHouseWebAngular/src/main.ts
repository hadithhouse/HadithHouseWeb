import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import {initFbSdk} from './fbauth';

if (environment.production) {
  enableProdMode();
}

// Initialize FB SDK and then bootstrap angular. Notice that we bootstrap
// even if we fail to load the SDK as we don't want the website not to
// function if we cannot load the SDK, e.g. if there is an AD blocker in
// the browser.
initFbSdk(() => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}, () => {
  console.error('Failed to load FB SDK. This is most probably due to a ' +
    'plugin in your browser, e.g. AdBlocker or Ghostery, blocking requests ' +
    'to social websites. Disable blocking for this website and try again.');
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
