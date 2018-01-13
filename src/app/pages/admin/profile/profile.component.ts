import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {WXService} from '../../../services/wx.service';
import {UserService} from '../../../services/user.service';
import {RatingComponent, RatingConfig} from '../../../modules/rating';
import {ButlerService} from '../../../services/butler.service';
import {ChartF2Service} from '../../../modules/chart-f2';

declare var F2: any;

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;

  gallery;

  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  rate: number = 3;

  slides: string[] = ['/assets/images/butlers/1.jpg', '/assets/images/butlers/2.jpg', '/assets/images/butlers/3.jpg', '/assets/images/butlers/4.jpg', '/assets/images/butlers/5.jpg', '/assets/images/butlers/6.jpg'];

  profile: any = {
    id: '001',
    type: 1,
    serviceType: '健身教练',
    name: '黑寡妇',
    age: 40,
    sex: 0,
    height: 167,
    weight: 52,
    experience: 10,
    skill: [],
    avatar: '/assets/images/avatars/1.jpg',
    post: '/assets/images/butlers/1.jpg',
    price: '12000',
    origin: '美国',
    level: 2,
    like: false,
    meta: {
      createAt: 1515400329000,
      updateAt: 1515400329000,
      expireAt: 1515400329000
    },
  };

  getHousekeeper: any;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private wx: WXService,
              private userSvc: UserService,
              private butlerSvc: ButlerService,
              private chartSvc: ChartF2Service) {
  }

  showGallery(show: boolean) {
    this.gallery = show;
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }

    this.route.paramMap.switchMap((params: ParamMap) => this.butlerSvc.getHousekeeper(+params.get('id'))).subscribe(housekeeper => {
      this.getHousekeeper = JSON.parse(housekeeper);
      console.log(this.getHousekeeper);
    });

    this.chartSvc.get().then(res => {
      F2.Global.pixelRatio = window.devicePixelRatio;
      const data = [
        {name: '关羽', props: '驾驶出行', value: 80},
        {name: '关羽', props: '科学运动', value: 94},
        {name: '关羽', props: '管家礼仪', value: 70},
        {name: '关羽', props: '法律知识', value: 95},
        {name: '关羽', props: '心理素质', value: 99},
        {name: '关羽', props: '安全预防', value: 99}
      ];

      const chart = new F2.Chart({
        id: 'mountNode'
      });

      chart.coord('polar');
      chart.source(data, {
        value: {
          min: 0,
          tickInterval: 20
        }
      });


      // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
      chart.axis('props', {
        label: {
          fontSize: 1
        },
        line: null
      });
      chart.axis('value', {
        label: null,
        line: null
      });

      chart.area().position('props*value').color('name').style({
        opacity: 0.6
      });
      // x和y轴同时缩放的动画
      chart.animate({
        type: 'scalexy'
      });
      chart.render();
    });
  }

}
