import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';
import {DialogService, PickerService} from 'ngx-weui';
import {StorageService} from '../../../services/storage.service';
import {EmployeeService} from '../../../services/employee.service';
import {LogService} from '../../../services/log.service';
import {UserService} from '../../../services/user.service';
import {Config} from '../../../config';

/*declare var _taq: any;*/
declare const _taq: any;

@Component({
  selector: 'app-guide-w-n-step9',
  templateUrl: './step-9.component.html',
  styleUrls: ['./step-9.component.scss']
})
export class GuideWNStep9Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  @ViewChild('container') private container: ElementRef;

  subscribeForm: FormGroup;
  isSubmit = false;
  loading = false;

  activeText = '获取验证码';
  activeClass = true;
  second = 59;
  timePromise = undefined;

  wType;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storageSvc: StorageService,
              private logSvc: LogService,
              private dialogSvc: DialogService,
              private wx: WxService,
              private picker: PickerService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
    if (route.snapshot.queryParams['gh'] === 'ylh') {
      storageSvc.set('wType', 0);
    }
    this.wType = parseInt(storageSvc.get('wType'), 10);
  }


  ngOnInit() {

    console.log(this.wType);
    this.wx.config({
      title: '大牛管家, 只为牛人服务',
      desc: '我们禀承“忠诚、安全、健康、舒心”的服务理念，旨在为全国高端商务人士及其家庭提供“安全防护、驾驶出行、科学运动”三大类日常综合管家服务。',
      link: Config.webHost + '/guide/w9?gh=userShare',
      imgUrl: Config.webHost + '/assets/images/guide/share.jpg'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });

    /*_taq.push({convert_id: '1608010185864196', event_type: 'form'});
    _taq.push({convert_id: '1608011262150692', event_type: 'form'});*/

    this.subscribeForm = new FormGroup({
      intentionType: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      customerMobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]),
      code: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      callbackUrl: new FormControl('', [Validators.required]),
      returnUrl: new FormControl('', [Validators.required]), // 支付页回退地址
      gh: new FormControl('', [])
    });

    this.subscribeForm.get('intentionType').setValue(0);
    this.subscribeForm.get('gh').setValue(this.route.snapshot.queryParams['gh']);
    this.subscribeForm.get('callbackUrl').setValue(Config.webHost + '/guide/w7?gh=' + this.route.snapshot.queryParams['gh']);
    this.subscribeForm.get('returnUrl').setValue(window.location.href);

    /*if (_taq) {
      _taq.push({convert_id: '1608010185864196', event_type: 'form'});
      _taq.push({convert_id: '1608011262150692', event_type: 'form'});
    }*/

    setTimeout(() => {
      if (_taq) {
        _taq.push({convert_id: '1608010185864196', event_type: 'form'});
        _taq.push({convert_id: '1608011262150692', event_type: 'form'});
      }
    }, 1000);

    /*this.subscribeForm.get('customerMobile').valueChanges.subscribe(res => {
      if (this.subscribeForm.get('customerMobile').valid) {
        console.log(res);
      }
    });

    this.subscribeForm.get('customerName').valueChanges.subscribe(res => {
      if (this.subscribeForm.get('customerMobile').valid) {
        console.log(res);
      }
    });*/

    this.logSvc.pageLoad('W' + this.wType, this.subscribeForm.get('gh').value);
  }

  nameBlur() {
    if (this.subscribeForm.get('customerName').valid) {
      this.logSvc.__log('inputName', 'W' + this.wType, this.subscribeForm.get('gh').value);
    }
  }

  mobileBlur() {
    if (this.subscribeForm.get('customerMobile').valid) {
      this.logSvc.__log('inputMobile', 'W' + this.wType, this.subscribeForm.get('gh').value);
    }
  }

  codeBlur() {
    if (this.subscribeForm.get('code').valid) {
      this.logSvc.__log('inputCode', 'W' + this.wType, this.subscribeForm.get('gh').value);
    }
  }

  pick() {
    this.router.navigate(['/guide/w4'], {queryParamsHandling: 'merge'});
    this.logSvc.__log('pick', 'W' + this.wType, this.subscribeForm.get('gh').value);
  }

  getCode(mobile) {
    if (!this.activeClass) {
      return false;
    }
    this.userSvc.getCode(mobile).then(res => {
      this.logSvc.__log('getCode', 'W' + this.wType, this.subscribeForm.get('gh').value);
      if (res.code === 0) {
        this.activeClass = false;
        this.timePromise = setInterval(() => {
          if (this.second <= 0) {
            clearInterval(this.timePromise);
            this.timePromise = undefined;

            this.second = 59;
            this.activeText = '重发验证码';
            this.activeClass = true;
          } else {
            this.activeText = '' + this.second + 's';
            this.activeClass = false;
            this.second = this.second - 1;
          }
        }, 1000);
      } else {
        this.dialogSvc.show({
          title: '系统提示',
          content: res.msg
        }).subscribe(data => {
          console.log(data);
        });
      }
      console.log(res);
    });
  }

  submit() {
    this.isSubmit = true;
    this.logSvc.__log('reserve', 'W' + this.wType, this.subscribeForm.get('gh').value);

    if (this.subscribeForm.invalid || this.loading) {
      /*if (this.subscribeForm.invalid) {
        let times = 1;
        try {
          const interval = setInterval(() => {
            this.container.nativeElement.scrollTop = (((this.container.nativeElement.scrollHeight) / 320) * 16 * times);
            times = times + 1;
          }, 16);
          setTimeout(function () {
            clearInterval(interval);
          }, 320);
        } catch (err) {
          console.log(err);
        }
      }*/
      return false;
    }
    this.loading = true;
    this.employeeSvc.reserveButler(this.subscribeForm.value).then(res => {
      if (res.code === 0) {
        /*const locUrl = encodeURIComponent(window.location.href);
        const _url = res.msg.indexOf('?') === -1 ? res.msg + '?returnUrl=' + locUrl : res.msg + '&returnUrl=' + locUrl;
        window.location.href = _url;*/

        this.router.navigate(['/guide/w7'], {queryParams: {gh: this.subscribeForm.get('gh').value}});
      } else {
        this.dialogSvc.show({content: res.msg, cancel: '', confirm: '我知道了'}).subscribe();
      }
      this.loading = false;
    });
  }
}
