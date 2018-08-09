import {Component, ViewEncapsulation, ErrorHandler} from '@angular/core';
import {Location} from '@angular/common';
import {LogService} from './services/log.service';
import {UaService} from './services/ua.service';
import {StorageService} from './services/storage.service';

import {rnd} from './utils/utils';

declare var wx: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements ErrorHandler {

  constructor(private locationSvc: Location,
              private storageSvc: StorageService,
              private ua: UaService,
              private logSvc: LogService) {
    locationSvc.subscribe(res => {
      if (res.type === 'popstate' && res.url === '/admin/home') {
        wx.closeWindow();
      }
    });
    this.storageSvc.set('wType', rnd() >= 0 ? 1 : 0);
  }

  handleError(error: any): void {
    console.log(error);
    const _error = {
      platform: this.ua.getPlatform(),
      isWx: this.ua.isWx(),
      ua: this.ua.getUa(),
      av: this.ua.getAv(),
      url: window.location.href,
      error: error.toString()
    };
    this.logSvc._log('error', _error).then(res => {
      console.log(res);
    });
  }

  getState(outlet) {
    return outlet.activatedRouteData.state;
  }
}
