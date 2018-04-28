import {Component, OnInit} from '@angular/core';

import {PageConfig} from '../../../page.config';
import {WxService} from '../../../../modules/wx';
import {PickerService} from 'ngx-weui';
import {EmployeeService} from '../../../../services/employee.service';

@Component({
  selector: 'app-front-guide-step1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.scss']
})
export class FrontGuideStep1Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  citys;
  city;

  levels;

  constructor(private wx: WxService,
              private picker: PickerService,
              private employeeSvc: EmployeeService) {
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

    this.employeeSvc.getLevelList().then(res => {
      const levels = [];
      res.list.forEach((item, index) => {
        const level = item;
        if (index === 0) {
          level.price = 18000;
          level.content = '资深大牛  顶端服务';
          level.avatar = '/assets/images/front/guide/cartoon-4.png';
        }
        if (index === 1) {
          level.price = 14000;
          level.content = '大牛成长  技能精熟';
          level.avatar = '/assets/images/front/guide/cartoon-3.png';
        }
        if (index === 2) {
          level.price = 12000;
          level.content = '小牛出道  努力奋斗';
          level.avatar = '/assets/images/front/guide/cartoon-2.png';
        }
        if (index === 3) {
          level.price = 10000;
          level.content = '新生小牛  魅力无限';
          level.avatar = '/assets/images/front/guide/cartoon-1.png';
        }
        levels.push(level);
      });
      this.levels = levels;
    });


    // areaid
    this.employeeSvc.getServiceAreaList().then(res => {
      const citys = [];
      res.list.forEach(item => {
        const city = {
          label: '',
          value: ''
        };
        city.label = item.areaname;
        city.value = item.areaid;
        citys.push(city);
      });
      this.citys = citys;
    });

  }

  showPicker() {
    this.picker.show([this.citys], [], [], {cancel: '取消', confirm: '确定'}).subscribe(res => {
      this.city = res.items[0];
    });
  }

}
