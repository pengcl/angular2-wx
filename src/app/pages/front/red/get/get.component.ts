import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../../../services/toast.service';
import {WXService} from '../../../../services/wx.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import {PageConfig} from '../../../page.config';

@Component({
  selector: 'app-front-red-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.scss']
})
export class FrontRedGetComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  jsApiList: string[] = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];

  constructor(private toast: ToastService, private wxService: WXService) {
  }


  ngOnInit() {
  }

}
