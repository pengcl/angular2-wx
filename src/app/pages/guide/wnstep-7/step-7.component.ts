import {Component, OnInit} from '@angular/core';
import {PageConfig} from '../../page.config';

import {WxService} from '../../../modules/wx';
import {UaService} from '../../../services/ua.service';
import {Config} from '../../../config';

@Component({
  selector: 'app-guide-w-n-step7',
  templateUrl: './step-7.component.html',
  styleUrls: ['./step-7.component.scss']
})
export class GuideWNStep7Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  isWx = false;

  constructor(private wxSvc: WxService,
              private uaSvc: UaService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.isWx = this.uaSvc.isWx();

    this.wxSvc.config({
      title: '大牛管家, 只为牛人服务',
      desc: '我们禀承“忠诚、安全、健康、舒心”的服务理念，旨在为全国高端商务人士及其家庭提供“安全防护、驾驶出行、科学运动”三大类日常综合管家服务。',
      link: Config.webHost + '/guide/w4?gh=userShare',
      imgUrl: Config.webHost + '/assets/images/guide/share.jpg'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });
    console.log(this.uaSvc.isWx());
  }

}
