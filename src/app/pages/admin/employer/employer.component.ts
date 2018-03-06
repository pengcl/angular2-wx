import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {EmployerService} from '../../../services/employer.service';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-admin-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class AdminEmployerComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  employer;
  employees;
  contractList;
  count = {
    msg: 0,
    rate: 0
  };

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private orderSvc: OrderService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.wx.config({
      success: function () {
        console.log(this);
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

    this.employerSvc.getEmployer(this.user.id).then(res => {
      if (res.code === 0) {
        this.employer = res.cust;
        console.log(this.employer);
      }
    });
    this.employerSvc.getMyEmployees(this.user.id).then(res => {
      if (res.code === 0) {
        this.employees = res.list;
      } else {
        console.log(res.msg);
      }
    });

    this.employerSvc.getCount(this.user.id).then(res => {
      this.count = {
        msg: res.msgCount,
        rate: res.evalCount
      };
    });

    this.orderSvc.getOrders('employer', this.user.id).then(res => {
      if (res.code === 0) {
        this.contractList = res.list;
      }
    });
  }

  onShare() {
    this.wx.show({}).subscribe(res => {
    });
  }
}
