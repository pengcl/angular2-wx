import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PageConfig} from './../../../page.config';
import {WxService} from '../../../../modules/wx';
import {DialogService, ActionSheetService, ActionSheetConfig} from 'ngx-weui';

import {ACTIONSHEETS} from '../../../../../mockData/actionSheets';

declare var $: any;
declare var mojs: any;

const OPTS = {
  fill: 'none',
  radius: 25,
  strokeWidth: {50: 0},
  scale: {0: 1},
  duration: 500,
  left: 0, top: 0,
  easing: 'cubic.out'
};

@Component({
  selector: 'app-front-guide-step4',
  templateUrl: './step-4.component.html',
  styleUrls: ['./step-4.component.scss']
})
export class FrontGuideStep4Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  subscribeForm: FormGroup;

  config: ActionSheetConfig = <ActionSheetConfig>{
    backdrop: true
  };

  actionSheets = ACTIONSHEETS;

  menus: any[];
  extraShow: boolean = false;
  isSubmit: boolean = false;

  constructor(private router: Router,
              private wx: WxService,
              private dialog: DialogService,
              private actionSheet: ActionSheetService) {
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
    this.subscribeForm = new FormGroup({
      customerName: new FormControl('', [Validators.required]),
      customerMobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      serviceAreaId: new FormControl('', [Validators.required]),
      serviceAreaName: new FormControl('', [Validators.required])
    });
  }

  onShow(target, exTarget?) {
    this.config.title = '请选择' + this.actionSheets[target].title;
    this.menus = this.actionSheets[target].data;
    this.actionSheet.show(this.menus, this.config).subscribe((res: any) => {
      console.log(res);
      this.subscribeForm.get(target).setValue(res.value);
      if (exTarget) {
        this.subscribeForm.get(exTarget).setValue(res.text);
      }
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.subscribeForm.valid) {
      this.dialog.show({
        content: '<p class="text-left">我们已经收到您的管家需求，稍后将有客服人员与您联系</p><p class="text-left">请留意广州(020)的来电</p>',
        confirm: '去大牛管家官网看看'
      }).subscribe(data => {
        if (data === 'confirm') {
          this.router.navigate(['/front/index'], {});
        }
        console.log(data);
      });
    }
  }

}
