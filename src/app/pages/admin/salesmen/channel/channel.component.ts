import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {Config} from '../../../../config';

import {SalesService} from '../../../../services/sales.service';
import {ToastService, DialogService, DialogConfig} from 'ngx-weui';

@Component({
  selector: 'app-admin-salesmen-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.scss']
})
export class AdminSalesmenChannelComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  admin;
  userInfo;
  config = Config;

  resellers;
  name;

  yesterdayCount = 0;
  totalCount;

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
    this.getReseller();
  }

  getYesterday() {
    const now = new Date();
    const date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return date;
  }

  getReseller() {
    this.salesSvc.getReseller(this.user.id).then(res => {
      if (res.code === 0) {
        this.resellers = res.list;
        this.totalCount = res.list.length;
        console.log(this.resellers);
        res.list.forEach(item => {
          const orderDate = Date.parse(item.createtime.replace(/\-/g, '/'));

          const yesterday = new Date(Date.parse(new Date().toString()) - 24 * 60 * 60 * 1000);
          const date = Date.parse(new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate()).toString());

          if (orderDate > date && orderDate < date + 24 * 60 * 60 * 1000) {
            this.yesterdayCount = this.yesterdayCount + 1;
          }
        });
      }
    });
  }

  updateChannel(resellerId, remark) {
    this.salesSvc.updateRemark({
      custId: resellerId,
      refereeRemark: remark
    }).then(res => {
      if (res.code === 0) {
        this.getReseller();
      }
    });
  }

  showUpdateChannel(reseller) {
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
          this.updateChannel(reseller.id, data.result);
          this.toastSvc.show(`更新成功`);
        }
      });
    });
  }

  onSearch(e) {
    this.salesSvc.getReseller(this.user.id, e).then(res => {
      if (res.code === 0) {
        this.resellers = res.list;
      }
    });
  }

  onCancel() {
    this.salesSvc.getReseller(this.user.id, '').then(res => {
      if (res.code === 0) {
        this.resellers = res.list;
      }
    });
  }

  onClear() {
    this.salesSvc.getReseller(this.user.id, '').then(res => {
      if (res.code === 0) {
        this.resellers = res.list;
      }
    });
  }

  onSubmit(e) {
    this.salesSvc.getReseller(this.user.id, e).then(res => {
      if (res.code === 0) {
        this.resellers = res.list;
      }
    });
  }
}
