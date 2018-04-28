import {Component, OnInit} from '@angular/core';

import {PageConfig} from '../../../page.config';
import {WxService} from '../../../../modules/wx';

import {simAnim, slide} from '../../../../utils/animate';

@Component({
  selector: 'app-front-guide-step2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.scss'],
  animations: [simAnim, slide]
})
export class FrontGuideStep2Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  capabilities: string = '';
  animationName = ['zoomOut', 'zoomOut', 'zoomOut', 'zoomOut', 'zoomOut', 'zoomOut'];

  constructor(private wx: WxService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.wx.config({
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

  selectedCapability(capability, index) {
    let _capabilities = !!this.capabilities ? this.capabilities.split(',') : [];
    if (this.capabilities.indexOf(capability) !== -1) {
      this.animationName[index] = 'zoomOut';
      _capabilities = _capabilities.filter(k => {
        return k !== capability;
      });
    } else {
      this.animationName[index] = 'zoomIn';
      _capabilities.push(capability);
    }
    this.capabilities = _capabilities.toString();
  }

}
