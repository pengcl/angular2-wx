import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {StorageService} from '../../../../services/storage.service';
import {UserService} from '../../../../services/user.service';
import {EmployerService} from '../../../../services/employer.service';
import {SalesService} from '../../../../services/sales.service';
import {Config} from '../../../../config';

@Component({
  selector: 'app-admin-salesmen-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminSalesmenHomeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  admin;
  userInfo;
  config = Config;

  customerLength;
  resellerLength;
  orderLength;

  constructor(private router: Router,
              private wx: WxService,
              private storageSvc: StorageService,
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private salesSvc: SalesService) {
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

    this.user = this.userSvc.isLogin();
    this.employerSvc.getEmployer(this.user.id).then(res => {
      this.userInfo = res.cust;
      console.log(this.userInfo);
    });

    this.salesSvc.getCustomers(this.user.id).then(res => {
      this.customerLength = res.list.length;
    });
    this.salesSvc.getReseller(this.user.id).then(res => {
      this.resellerLength = res.list.length;
    });
    this.salesSvc.getOrders({custId: this.user.id, agent: 2}).then(res => {
      this.orderLength = res.list.length;
    });
  }

  logout() {
    this.storageSvc.clear();
    this.router.navigate(['/admin/login']);
  }
}
