import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import 'rxjs/add/operator/switchMap';

import {WxService} from './services/wx.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private route: ActivatedRoute,
              private location: Location,
              private wxService: WxService) {
  }

  ngOnInit() {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.wxService.getUserInfo(+params.get('openid')))
      .subscribe(userInfo => this.userInfo = userInfo);
    /*if (this.wxService.isWx()) {
      this.wxService.getOpenid(window.location.href);
    }*/
  }
}
