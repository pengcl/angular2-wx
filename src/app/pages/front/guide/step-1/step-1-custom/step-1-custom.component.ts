import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from '../../../../page.config';
import {WxService} from '../../../../../modules/wx';
import {PickerService} from '../../../../../modules/picker';
import {getAddress} from '../../../../../utils/utils';
import {DialogService} from '../../../../../modules/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-front-guide-step1-custom',
  templateUrl: './step-1-custom.component.html',
  styleUrls: ['./step-1-custom.component.scss']
})
export class FrontGuideStep1CustomComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  reportCityForm: FormGroup;

  cityData;
  employeeTypes = ['专业司机', '事务助理', '运动陪练', '安全咨询', '其他'];
  isSubmit = false;

  constructor(private router: Router,
              private wx: WxService,
              private picker: PickerService,
              private dialog: DialogService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.wx.config({
      success: function () {
        console.log(this);
        console.log('success');
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

    this.picker.getCity().then(data => {
      this.cityData = data;
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

  /*onSubmit() {
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
          const that = this;
          this.wx.config({
            success: function () {
              console.log('success');
              that.router.navigate(['/front/index'], {});
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
        });
      }
    });
  }*/

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
    this.picker.destroy();
  }

}
