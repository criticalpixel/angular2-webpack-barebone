import { platformBrowser }    from '@angular/platform-browser';
import { AppModuleNgFactory } from './compiled/src/app/app.module.ngfactory';
import { enableProdMode } from '@angular/core';
import { environment } from './app/environment';

if (environment.production) {
  enableProdMode();
}


platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);