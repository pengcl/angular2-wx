import {Component, ViewEncapsulation, ErrorHandler} from '@angular/core';
import {LogService} from './services/log.service';
import {UaService} from './services/ua.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements ErrorHandler {

  constructor(private ua: UaService, private logSvc: LogService) {
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
    console.log(outlet);
    return outlet.activatedRouteData.state;
  }
}
