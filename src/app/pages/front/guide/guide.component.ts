import {Component, OnInit} from '@angular/core';

import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';

@Component({
  selector: 'app-front-guide',
  templateUrl: './guide.component.html',
  styleUrls: ['./guide.component.scss']
})
export class FrontGuideComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor(private wxService: WxService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.wxService.config({
      title: '大牛管家服务预订',
      desc: '专注提供贴心的高级管家服务，包括安全防护、科学运动、驾驶出行三大类日常综合管家服务！',
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
