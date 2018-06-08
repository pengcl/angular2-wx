import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployerService} from '../../../../services/employer.service';
import {Config} from '../../../../config';

import {SalesService} from '../../../../services/sales.service';
import {DialogConfig, DialogService, ToastService} from 'ngx-weui';

@Component({
  selector: 'app-admin-salesmen-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class AdminSalesmenStatisticsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  reseller: any;
  custId;
  config = Config;

  intentCount;
  contOrderCount;
  balance;

  statistics;

  private DEFCONFIG: DialogConfig = <DialogConfig>{
    title: '请填写好友的手机号码',
    content: '成功后，好友的手机号就是登录账号了。他也可以参与荐才行动，一起推荐拿补贴！',
    cancel: '取消',
    confirm: '确定',
    inputPlaceholder: '请填写好友的手机号码',
    inputError: '请填写正确的手机号码',
    inputRequired: true
  };

  constructor(private dialogSvc: DialogService,
              private toastSvc: ToastService,
              private wx: WxService,
              private route: ActivatedRoute,
              private userSvc: UserService,
              private salesSvc: SalesService,
              private employerSvc: EmployerService) {
  }

  ngOnInit() {

    this.user = this.userSvc.isLogin();
    this.custId = this.route.snapshot.params['id'];
    this.intentCount = this.route.snapshot.queryParams['intentCount'];
    this.contOrderCount = this.route.snapshot.queryParams['contOrderCount'];
    this.balance = this.route.snapshot.queryParams['balance'];

    this.getReseller();
    this.salesSvc.getStatistics(this.custId).then(res => {
      this.statistics = res.list;
    });
  }

  getReseller() {
    this.employerSvc.getEmployer(this.custId).then(res => {
      this.reseller = res.cust;
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
}
