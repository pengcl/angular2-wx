import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {Location, LocationStrategy, PlatformLocation} from '@angular/common';
import {PageConfig} from './page.config';
import {WxService} from '../../../modules/wx';
import {StorageService} from '../../../services/storage.service';
import {UserService} from '../../../services/user.service';
import {EmployerService} from '../../../services/employer.service';
import {OrderService} from '../../../services/order.service';
import {MeiqiaService} from '../../../services/meiqia.service';
import {Config} from '../../../config';

declare var wx: any;

@Component({
  selector: 'app-admin-employer',
  templateUrl: './employer.component.html',
  styleUrls: ['./employer.component.scss']
})
export class AdminEmployerComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  config = Config;
  user: any;
  employer;
  employees;
  contractList;
  admin;
  count = {
    msg: 0,
    rate: 0
  };

  constructor(private storageSvc: StorageService,
              private router: Router,
              private route: ActivatedRoute,
              private location: LocationStrategy,
              private wxSvc: WxService,
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private orderSvc: OrderService,
              private meiqiaSvc: MeiqiaService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.wxSvc.config({
      title: '大牛管家, 只为牛人服务',
      desc: '我们禀承“忠诚、安全、健康、舒心”的服务理念，旨在为全国高端商务人士及其家庭提供“安全防护、驾驶出行、科学运动”三大类日常综合管家服务。',
      link: Config.webHost + '/assets/html/w/start.html',
      imgUrl: Config.webHost + '/assets/images/guide/share.jpg'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });

    this.location.onPopState(state => {
      this.wxSvc.destroyAll();
    });

    this.employerSvc.getEmployer(this.user.id).then(res => {
      if (res.code === 0) {
        this.employer = res.cust;
        this.admin = res.isUser;
      }
    });
    this.employerSvc.getMyEmployees(this.user.id).then(res => {
      if (res.code === 0) {
        this.employees = res.list;
      } else {
      }
    });

    this.employerSvc.getCount(this.user.id).then(res => {
      console.log(res);
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
    this.location.pushState('', 'onShare', this.location.path(), '');
    this.wxSvc.show({}).subscribe(res => {
    });
  }

  contact() {
    this.meiqiaSvc.show();
  }

  logout() {
    this.storageSvc.clear();
    this.router.navigate(['/admin/login']);
  }

  ngOnDestroy() {
    this.wxSvc.destroyAll();
  }
}
