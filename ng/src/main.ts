import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import * as toastr from 'toastr';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

if (environment.production) {
  enableProdMode();
}

// Set Toastr options.
(() => {
  toastr.options.closeButton = true;
  toastr.options.closeButton = true;
  toastr.options.debug = false;
  toastr.options.newestOnTop = true;
  toastr.options.progressBar = false;
  toastr.options.positionClass = 'toast-bottom-full-width';
  toastr.options.preventDuplicates = false;
  toastr.options.showDuration = 300;
  toastr.options.hideDuration = 1000;
  toastr.options.timeOut = 5000;
  toastr.options.extendedTimeOut = 1000;
  toastr.options.showEasing = 'swing';
  toastr.options.hideEasing = 'linear';
  toastr.options.showMethod = 'fadeIn';
  toastr.options.hideMethod = 'fadeOut';
})();

// Bootstrap Angular
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.log(err));
