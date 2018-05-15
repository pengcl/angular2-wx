import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {RatingConfig} from 'ngx-weui';

import 'rxjs/add/operator/switchMap';
import {EmployerService} from '../../../../../services/employer.service';
import {Config} from '../../../../../config';

// payStatus 0=未支付，1=部分支付，2=已支付

@Component({
  selector: 'app-admin-employer-rate-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEmployerRateListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user: any;

  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  rate: number = 3;
  swiperConfig = {
    direction: 'horizontal',
    slidesPerView: 5,
    centeredSlides: false,
    keyboard: true,
    observer: true,
    mousewheel: true,
    scrollbar: false,
    navigation: false,
    pagination: false
  };

  items;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employer.getMyRates(this.user.id).then(res => {
      this.items = res.list;
    });
  }

}
