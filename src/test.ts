// This file is required by karma.conf.js and loads recursively all the
// .spec and framework files

import 'zone.js/dist/zone-testing';
import {getTestBed, TestBed} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

import {
  MODULE_DECLARATIONS,
  MODULE_IMPORTS,
  MODULE_PROVIDERS
} from './app/app.module';

declare const require: any;

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);


export function configureTestBed() {
  TestBed.configureTestingModule(
    {
      declarations: MODULE_DECLARATIONS,
      imports: MODULE_IMPORTS,
      providers: MODULE_PROVIDERS
    }
  ).compileComponents();
}

// Then we find all the tests.
const context = require.context('./', true, /\.spec\.ts$/);
// And load the modules.
context.keys().map(context);
