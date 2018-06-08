import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {DialogService, DialogConfig, ToastService} from 'ngx-weui';
import {Config} from '../../../../config';

import {SalesService} from '../../../../services/sales.service';

@Component({
  selector: 'app-admin-salesmen-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class AdminSalesmenCustomerComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  admin;
  userInfo;
  config = Config;

  customers;
  customerCount;
  yesterdayCount = 0;

  name = '';

  payTypeDate = [
    {label: '全部', value: 'all'},
    {label: '未支付', value: 'all'},
    {label: '已支付', value: 'all'}
  ];

  private DEFCONFIG: DialogConfig = <DialogConfig>{
    title: '请填写好友的手机号码',
    content: '成功后，好友的手机号就是登录账号了。他也可以参与荐才行动，一起推荐拿补贴！',
    cancel: '取消',
    confirm: '确定',
    inputPlaceholder: '新的备注',
    inputError: '',
    inputRequired: true
  };

  constructor(private wx: WxService,
              private dialogSvc: DialogService,
              private toastSvc: ToastService,
              private userSvc: UserService,
              private salesSvc: SalesService) {
  }

  ngOnInit() {

    this.user = this.userSvc.isLogin();
    this.salesSvc.getCustomers(this.user.id).then(res => {
      this.customers = res.list;
      res.list.forEach(item => {
        const orderDate = Date.parse(item.createtime.replace(/\-/g, '/'));

        const yesterday = new Date(Date.parse(new Date().toString()) - 24 * 60 * 60 * 1000);
        const date = Date.parse(new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).toString());

        if (orderDate > date && orderDate < date + 24 * 60 * 60 * 1000) {
          this.yesterdayCount = this.yesterdayCount + 1;
        }
      });
    });
  }

  addFollow(customer) {
    this.salesSvc.addFollow(customer.id, this.user.id).then(res => {
      this.getCustomers();
    });
  }

  removeFollow(customer) {
    this.salesSvc.removeFollow(customer.id, this.user.id).then(res => {
      this.getCustomers();
    });
  }

  getCustomers() {
    this.salesSvc.getCustomers(this.user.id).then(res => {
      this.customers = res.list;
    });
  }

  updateChannel(resellerId, remark) {
    this.salesSvc.updateRemark({
      custId: resellerId,
      refereeRemark: remark
    }).then(res => {
      if (res.code === 0) {
        this.getCustomers();
      }
    });
  }

  showUpdateChannel(customer) {
    setTimeout(() => {
      const cog = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
        title: '修改备注',
        content: '',
        cancel: '取消',
        confirm: '确定',
        inputPlaceholder: '新的备注',
        inputError: '',
        inputRequired: true,
        skin: 'auto',
        type: 'prompt',
        input: 'text',
        inputValue: undefined
      });

      this.dialogSvc.show(cog).subscribe((data: any) => {
        if (data.result) {
          this.updateChannel(customer.id, data.result);
          this.toastSvc.show(`更新成功`);
        }
      });
    });
  }

  onSearch(e) {
    this.salesSvc.getCustomers(this.user.id, e).then(res => {
      this.customers = res.list;
    });
  }

  onCancel() {
    this.salesSvc.getCustomers(this.user.id, '').then(res => {
      this.customers = res.list;
    });
  }

  onClear() {
    this.salesSvc.getCustomers(this.user.id, '').then(res => {
      this.customers = res.list;
    });
  }

  onSubmit(e) {
    this.salesSvc.getCustomers(this.user.id, e).then(res => {
      this.customers = res.list;
    });
  }
}
