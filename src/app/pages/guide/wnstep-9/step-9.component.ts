import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';
import {DialogService, PickerService} from 'ngx-weui';
import {EmployeeService} from '../../../services/employee.service';
import {LogService} from '../../../services/log.service';
import {getRate, validScroll} from '../../../utils/utils';
import {Config} from '../../../config';

@Component({
  selector: 'app-guide-w-n-step9',
  templateUrl: './step-9.component.html',
  styleUrls: ['./step-9.component.scss']
})
export class GuideWNStep9Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  subscribeForm: FormGroup;
  isSubmit = false;
  loading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private logSvc: LogService,
              private dialogSvc: DialogService,
              private wx: WxService,
              private picker: PickerService,
              private employeeSvc: EmployeeService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
    logSvc.pageLoad('B');
  }


  ngOnInit() {
    this.wx.config({
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

    this.subscribeForm = new FormGroup({
      intentionType: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      customerMobile: new FormControl('', [Validators.required, Validators.min(10000000000), Validators.max(19999999999), Validators.pattern(/^[0-9]*$/)]),
      callbackUrl: new FormControl('', [Validators.required]),
      gh: new FormControl('', [])
    });

    this.subscribeForm.get('intentionType').setValue(0);
    this.subscribeForm.get('gh').setValue(this.route.snapshot.queryParams['gh']);
    this.subscribeForm.get('callbackUrl').setValue(Config.webHost + '/guide/w7');

  }

  submit() {
    this.isSubmit = true;

    if (this.subscribeForm.invalid || this.loading) {
      return false;
    }
    this.loading = true;
    this.employeeSvc.reserveButler(this.subscribeForm.value).then(res => {
      if (res.code === 0) {
        this.router.navigate(['/guide/w7']);
      } else {
        this.dialogSvc.show({content: res.msg, cancel: '', confirm: '我知道了'}).subscribe();
      }
    });
  }
}
