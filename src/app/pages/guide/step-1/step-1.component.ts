import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';
import {DialogService, PickerService} from 'ngx-weui';
import {EmployeeService} from '../../../services/employee.service';
import {LogService} from '../../../services/log.service';
import {validScroll} from '../../../utils/utils';
import {Config} from '../../../config';

@Component({
  selector: 'app-guide-step1',
  templateUrl: './step-1.component.html',
  styleUrls: ['./step-1.component.scss']
})
export class GuideStep1Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  months: string[] = Array(10).fill('').map((v: string, idx: number) => `${idx + 3}`);

  citys;
  city;

  levels;
  level;

  subscribeForm: FormGroup;
  isSubmit = false;
  loading = false;

  accommodations = [
    {label: '提供住宿', value: '提供'},
    {label: '不提供住宿', value: '不提供'},
  ];

  @ViewChild('scrollMe') private container: any;

  constructor(private router: Router,
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
      link: Config.webHost + '/guide/start',
      imgUrl: Config.webHost + '/assets/images/guide/share.jpg'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });

    this.subscribeForm = new FormGroup({
      customerName: new FormControl('', [Validators.required]),
      customerMobile: new FormControl('', [Validators.required, Validators.min(10000000000), Validators.max(19999999999), Validators.pattern(/^[0-9]*$/)]),
      serviceAreaId: new FormControl('', [Validators.required]),
      serviceAreaName: new FormControl('', [Validators.required]),
      levelId: new FormControl('', [Validators.required]),
      levelName: new FormControl('', [Validators.required]),
      accommodation: new FormControl('', [Validators.required])
    });

    this.employeeSvc.getLevelList().then(res => {
      const levels = [];
      res.list.forEach((item, index) => {
        const level = item;
        if (index === 0) {
          level.price = 21000;
          level.tag = '5-8年特种部队磨砺';
          level.content = '2年以上相关工作经历，驾驶技术娴熟，综合技能优秀';
          level.avatar = '/assets/images/front/guide/cartoon-4.png';
        }
        if (index === 1) {
          level.price = 16000;
          level.tag = '2-5年特种部队磨砺';
          level.content = '2年工作经历，驾驶技术娴熟，综合技能优良';
          level.avatar = '/assets/images/front/guide/cartoon-3.png';
        }
        if (index === 2) {
          level.price = 14000;
          level.tag = '2-5年作战部队磨砺';
          level.content = '1年工作经历，驾驶技术熟练，综合技能良好';
          level.avatar = '/assets/images/front/guide/cartoon-2.png';
        }
        if (index === 3) {
          level.price = 12000;
          level.tag = '2年以上部队磨砺';
          level.content = '驾驶技术熟练，综合技能达标';
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
      console.log(this.citys);
    });

  }

  setCity(city) {
    this.subscribeForm.get('serviceAreaId').setValue(city.value);
    this.subscribeForm.get('serviceAreaName').setValue(city.label);
  }

  setLevel(level) {
    console.log(level);
    this.subscribeForm.get('levelId').setValue(level.levelid);
    this.subscribeForm.get('levelName').setValue(level.levelname);
  }

  setAccommodation(accommodation) {
    this.subscribeForm.get('accommodation').setValue(accommodation.value);
  }

  showNumPicker() {
    this.picker.show(this.months, (this.subscribeForm.get('servicePeriod').value ? this.subscribeForm.get('servicePeriod').value : 3), [], {
      cancel: '取消',
      confirm: '确定'
    }).subscribe(res => {
      this.subscribeForm.get('servicePeriod').setValue(res.value);
    });
  }

  submit() {
    this.isSubmit = true;

    const valid = validScroll(this.subscribeForm.controls);

    if (!valid.valid) {// page_scroll_to_target
      const target = this.container.nativeElement.querySelector('.check-' + valid.control).offsetTop;
      let times = 1;
      try {
        const interval = setInterval(() => {
          this.container.nativeElement.scrollTop = this.container.nativeElement.scrollTop - (((this.container.nativeElement.scrollTop - target) / 320) * 16 * times);
          times = times + 1;
        }, 16);
        setTimeout(function () {
          clearInterval(interval);
        }, 320);
      } catch (err) {
        console.log(err);
      }
      return false;
    }

    if (this.subscribeForm.invalid || this.loading) {
      return false;
    }
    this.loading = true;
    this.employeeSvc.reserveButler(this.subscribeForm.value).then(res => {
      if (res.code === 0) {
        this.router.navigate(['/guide/step2'], {queryParams: {orderNo: res.orderNo}});
      } else {
        this.dialogSvc.show({content: res.msg, cancel: '', confirm: '我知道了'}).subscribe();
      }
    });
  }
}
