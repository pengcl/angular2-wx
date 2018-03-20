import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from '../../../../page.config';
import {WxService} from '../../../../../modules/wx';
import {PickerService, DialogService, ActionSheetService} from 'ngx-weui';
import {getAddress} from '../../../../../utils/utils';
import {Router} from '@angular/router';

import {DATA} from '../../../../../utils/cn';

@Component({
  selector: 'app-front-guide-step1-custom',
  templateUrl: './step-1-custom.component.html',
  styleUrls: ['./step-1-custom.component.scss']
})
export class FrontGuideStep1CustomComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  reportCityForm: FormGroup;

  cityData = DATA;
  employeeTypes = ['专业司机', '事务助理', '运动陪练', '安全咨询', '其他'];
  isSubmit = false;

  constructor(private router: Router,
              private wx: WxService,
              private picker: PickerService,
              private actionSheet: ActionSheetService,
              private dialog: DialogService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.wx.config({
      success: function () {
        this.router.navigate(['/front/index'], {});
      },
      cancel: function () {
        console.log('cancel');
      }
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });

    this.reportCityForm = new FormGroup({
      serviceAreaName: new FormControl('', [Validators.required]),
      employeeType: new FormControl('', [Validators.required]),
      newType: new FormControl('', [Validators.required])
    });
  }

  onPickerShow(type: string, formControlName) {
    switch (type) {
      case 'city':
        this.picker.showCity(this.cityData).subscribe((res: any) => {
          this.reportCityForm.get(formControlName).setValue(getAddress(res.items));
        });
        break;
      case 'data':
        this.picker.show(this.employeeTypes, '运动陪练').subscribe((res: any) => {
          this.reportCityForm.get(formControlName).setValue(res.value);
          this.reportCityForm.get('newType').disable();
          if (res.value === '其他') {
            this.reportCityForm.get('newType').enable();
          }
        });
        break;
    }
  }

  onActionSheetShow(formControlName) {
    this.actionSheet.show([
      {text: '专业司机', value: '专业司机'},
      {text: '事务助理', value: '事务助理'},
      {text: '运动陪练', value: '运动陪练'},
      {text: '安全咨询', value: '安全咨询'},
      {text: '其他', value: '其他'}
    ], {
      title: '请选择您需要的聘请类型'
    }).subscribe((res: any) => {
      this.reportCityForm.get(formControlName).setValue(res.value);
      this.reportCityForm.get('newType').disable();
      if (res.value === '其他') {
        this.reportCityForm.get('newType').enable();
      }
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.reportCityForm.invalid) {
      return false;
    }

    this.dialog.show({
      content: '<p>您的需求我们已经收到，谢谢您的反馈!</p>',
      cancel: '大牛官网',
      confirm: '分享好友'
    }).subscribe(data => {
      if (data === 'cancel') {
        this.router.navigate(['/front/index'], {});
      }
      if (data === 'confirm') {
        this.wx.show({}).subscribe(res => {
        });
      }
    });
  }

  ngOnDestroy() {
    this.wx.destroyAll();
    this.picker.destroyAll();
  }

}
