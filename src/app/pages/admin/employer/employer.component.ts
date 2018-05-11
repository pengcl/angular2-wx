import {Component, OnInit, OnDestroy} from '@angular/core';
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
export class AdminEmployerComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  employer;
  employees;
  contractList;
  admin;
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
      title: '大牛管家诚聘优才',
      desc: '欢迎广大有志于高端管家助理服务的退伍军人，体育专业毕业生踊跃报名！',
      link: 'http://wap.danius.cn/front/resume/job',
      imgUrl: 'http://wap.danius.cn/assets/images/front/resume/share-icon.png',
      success: function () {
        console.log('success');
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
        this.admin = res.isUser;
        console.log(res);
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

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.wx.destroyAll();
  }
}
