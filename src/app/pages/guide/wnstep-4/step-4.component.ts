
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';



import {StorageService} from '../../../services/storage.service';
import {EmployeeService} from '../../../services/employee.service';
import {PickerService} from 'ngx-weui';
import {OrderService} from '../../../services/order.service';
import {MeiqiaService} from '../../../services/meiqia.service';
import {LogService} from '../../../services/log.service';
import {Config} from '../../../config';
import {getIndex} from '../../../utils/utils';

@Component({
  selector: 'app-guide-w-n-step4',
  templateUrl: './step-4.component.html',
  styleUrls: ['./step-4.component.scss']
})
export class GuideWNStep4Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  @ViewChild('scrollable') private scrollable: ElementRef;

  filterShow = false;

  pickerData = {
    driversAge: {
      selected: {
        label: '不限',
        value: '0'
      },
      data: [
        {
          label: '不限',
          value: '0'
        },
        {
          label: '1年',
          value: '1'
        },
        {
          label: '2年',
          value: '2'
        },
        {
          label: '3年以上',
          value: '3'
        }
      ]
    },
    soldierAge: {
      selected: {
        label: '不限',
        value: '0'
      },
      data: [
        {
          label: '不限',
          value: '0'
        },
        {
          label: '2年兵',
          value: '2'
        },
        {
          label: '5年兵',
          value: '5'
        }
      ]
    }
  };

  lists;

  params = {
    serviceAreaId: '',
    levelId: '',
    synthetical: '',
    driversAge: '',
    soldierAge: '',
    page: 1
  };

  gh;
  orderNo;
  isPaid: boolean = false;
  payUrl;

  isLoading = false;
  isFinished = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storageSvc: StorageService,
              private wx: WxService,
              private logSvc: LogService,
              private pickerSvc: PickerService,
              private employeeSvc: EmployeeService,
              private orderSvc: OrderService,
              private contactSvc: MeiqiaService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.wx.config({
      title: '大牛管家, 只为牛人服务',
      desc: '我们禀承“忠诚、安全、健康、舒心”的服务理念，旨在为全国高端商务人士及其家庭提供“安全防护、驾驶出行、科学运动”三大类日常综合管家服务。',
      link: Config.webHost + '/guide/w4',
      imgUrl: Config.webHost + '/assets/images/guide/share.jpg'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });

    this.orderNo = this.route.snapshot.queryParams['orderNo'];
    this.gh = this.route.snapshot.queryParams['gh'];

    if (this.orderNo) {
      this.orderSvc.getIntentServiceOrder(this.orderNo).then(res => {
        if (res.code === 0) {
          this.isPaid = !!res.intentServiceOrder.paidamount;
          this.payUrl = res.payUrl;
        }
      });
    }

    this.employeeSvc.getIntentList(this.params).then(res => {
      this.lists = res.list;
    });

    /*if (this.storageSvc.get('scroll')) {
      const scroll = JSON.parse(this.storageSvc.get('scroll'));
      this.employeeSvc.getIntentList(this.params).then(res => {
        this.lists = res.list;
        if (this.params.page <= scroll.page) {
          this.morePage();
        }
      });
    } else {
      this.employeeSvc.getIntentList(this.params).then(res => {
        this.lists = res.list;
      });
    }*/

    this.logSvc.pageLoad('WList', this.gh);
  }

  morePage() {
    this.employeeSvc.getIntentList(this.params).then(res => {
      this.lists.concat(res.list);
      const scroll = JSON.parse(this.storageSvc.get('scroll'));
      if (this.params.page < scroll.page) {
        this.params.page = this.params.page + 1;
        this.morePage();
      }
      if (this.params.page === scroll.page) {
        this.scrollable.nativeElement.scrollTop = scroll.top;
      }
    });
  }

  showPicker(target) {
    const defaultSelect = getIndex(this.pickerData[target].data, 'value', this.pickerData[target].selected.value);
    this.pickerSvc.show([this.pickerData[target].data], '', [defaultSelect], {
      cancel: '返回',
      confirm: '确定'
    }).subscribe(res => {
      this.pickerData[target].selected.label = res.items[0].label;
      this.pickerData[target].selected.value = res.items[0].value;
      this.params[target] = (res.value === '0' ? '' : res.value);
      this.params.page = 1;
      this.employeeSvc.getIntentList(this.params).then(data => {
        this.lists = data.list;
        this.restart();
        // this.comp.restart();
      });
    });
  }

  contact() {
    this.contactSvc.show();
  }

  resolveLoading() {
    this.isLoading = true;
  }

  setFinished() {
    this.isLoading = false;
    this.isFinished = true;
  }

  restart() {
    this.isLoading = false;
    this.isFinished = false;
  }

  onLoadMore(e) {
    this.filterShow = true;
    const percent = e.target.scrollTop / (e.target.scrollHeight - e.target.offsetHeight);
    this.storageSvc.set('scroll', JSON.stringify({top: e.target.scrollTop, page: this.params.page}));
    if (percent > 0.75) {
      if (this.isLoading || this.isFinished) {
        return false;
      }
      this.resolveLoading();
      observableTimer(1500).subscribe(() => {
        this.params.page = this.params.page + 1;
        this.employeeSvc.getIntentList(this.params).then(res => {
          this.isLoading = false;
          this.lists = this.lists.concat(res.list);
          if (res.page >= res.totalPage) {
            // comp.setFinished();
            this.setFinished();
            return;
          }
        });
      });
    }
  }
}
