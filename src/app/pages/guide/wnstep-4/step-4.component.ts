import {Component, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';

import {EmployeeService} from '../../../services/employee.service';
import {Observable} from 'rxjs/Observable';
import {PickerService, InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {OrderService} from '../../../services/order.service';
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

  @ViewChild('comp') private comp: InfiniteLoaderComponent;

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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private wx: WxService,
              private pickerSvc: PickerService,
              private employeeSvc: EmployeeService,
              private orderSvc: OrderService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
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
        this.comp.restart();
      });
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(1500).subscribe(() => {

      this.params.page = this.params.page + 1;
      this.employeeSvc.getIntentList(this.params).then(res => {
        this.lists = this.lists.concat(res.list);
        if (res.page >= res.totalPage) {
          comp.setFinished();
          return;
        }
      });

      comp.resolveLoading();
    });
  }
}
