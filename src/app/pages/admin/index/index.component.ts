import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WXService} from '../../../services/wx.service';
import {UserService} from '../../../services/user.service';
import {ChartF2Directive, ChartF2Service} from '../../../modules/chart-f2';

declare var F2: any;

const BUTLERS = [
  {
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
  },
  {
    id: '002',
    type: 1,
    serviceType: '安全保障',
    name: '钢铁侠',
    age: 40,
    sex: 1,
    height: 178,
    weight: 72,
    experience: 9,
    skill: [],
    avatar: '/assets/images/avatars/2.jpg',
    post: '/assets/images/butlers/2.jpg',
    price: '12000',
    origin: '美国',
    level: 1,
    like: false,
    meta: {
      createAt: 1515400329000,
      updateAt: 1515400329000,
      expireAt: 1515400329000
    },
  },
  {
    id: '003',
    type: 1,
    serviceType: '安全保障',
    name: '美国队长',
    age: 37,
    sex: 1,
    height: 178,
    weight: 72,
    experience: 9,
    skill: [],
    avatar: '/assets/images/avatars/3.jpg',
    post: '/assets/images/butlers/3.jpg',
    price: '12000',
    origin: '美国',
    level: 1,
    like: false,
    meta: {
      createAt: 1515400329000,
      updateAt: 1515400329000,
      expireAt: 1515400329000
    },
  }
];

@Component({
  selector: 'app-admin-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AdminIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;
  items: any[] = BUTLERS;

  constructor(private wx: WXService, private userSvc: UserService, private chartSvc: ChartF2Service) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }
    this.chartSvc.get().then(res => {
      F2.Global.pixelRatio = window.devicePixelRatio;
      const data = [
        {name: '张飞', props: '智力', value: 65},
        {name: '张飞', props: '武力', value: 97},
        {name: '张飞', props: '政治', value: 50},
        {name: '张飞', props: '统帅', value: 92},
        {name: '张飞', props: '忠诚', value: 99},

        {name: '关羽', props: '智力', value: 80},
        {name: '关羽', props: '武力', value: 94},
        {name: '关羽', props: '政治', value: 70},
        {name: '关羽', props: '统帅', value: 95},
        {name: '关羽', props: '忠诚', value: 99}
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
