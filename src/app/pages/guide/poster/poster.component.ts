import {Component, OnInit} from '@angular/core';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';

import {Config} from '../../../config';

@Component({
  selector: 'app-guide-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class GuidePosterComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor(private wx: WxService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.wx.config({
      title: '大牛管家, 只为牛人服务',
      desc: '我们禀承“忠诚、安全、健康、舒心”的服务理念，旨在为全国高端商务人士及其家庭提供“安全防护、驾驶出行、科学运动”三大类日常综合管家服务。',
      link: 'http://wap.danius.cn/front/guide',
      imgUrl: 'http://wap.danius.cn/assets/images/front/guide/share-icon.jpg'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });
  }
}
