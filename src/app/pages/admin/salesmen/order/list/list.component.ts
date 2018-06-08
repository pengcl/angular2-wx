import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {SalesService} from '../../../../../services/sales.service';
import {EmployerService} from '../../../../../services/employer.service';
import {PickerService} from 'ngx-weui';
import {Config} from '../../../../../config';

@Component({
  selector: 'app-admin-salesmen-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminSalesmenOrderListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  userInfo;
  config = Config;

  orderType = 'order';
  agentType = 2; // agent=1-下线，2-直接客户
  orders;

  filterMonth = '';
  filterPay = '';

  pickerPayData = [
    {
      label: '全部',
      value: ''
    },
    {
      label: '未支付',
      value: '1'
    },
    {
      label: '已支付',
      value: '2'
    }
  ];


  constructor(private wx: WxService,
              private pickerSvc: PickerService,
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private salesSvc: SalesService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employerSvc.getEmployer(this.user.id).then(res => {
      this.userInfo = res.cust;
    });
    this.getOrders(this.orderType, this.agentType);
  }

  getOrders(orderType, agentType) {
    const body = {
      custId: this.user.id,
      agentType: agentType,
      month: this.filterMonth,
      payStatus: this.filterPay
    };
    if (orderType === 'order') {
      this.salesSvc.getOrders(body).then(res => {
        this.orders = res.list;
      });
    } else {
      this.salesSvc.getIntentOrders(body).then(res => {
        this.orders = res.list;
      });
    }

  }

  setOrderType(type) {
    this.orderType = type;
    this.getOrders(this.orderType, this.agentType);
  }

  setAgentType(type) {
    this.agentType = type;
    this.getOrders(this.orderType, this.agentType);
  }

  pickerDateShow() {
    this.pickerSvc.showDateTime('date-ym').subscribe(res => {
      const dates = res.formatValue.split('-');
      this.filterMonth = dates[0] + '年' + dates[1] + '月';
      this.getOrders(this.orderType, this.agentType);
    });
  }

  pickerShow() {
    this.pickerSvc.show([this.pickerPayData], '', [0], {cancel: '返回', confirm: '确定'}).subscribe(res => {
      this.filterPay = res.items[0].value;
      console.log(this.filterPay);
      this.getOrders(this.orderType, this.agentType);
    });
  }

  onSearch(e) {
  }

  onCancel() {
  }

  onClear() {
  }

  onSubmit(e) {
  }
}
