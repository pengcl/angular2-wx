import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PageConfig} from './page.config';

import {StorageService} from '../../../services/storage.service';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {EmployeeService} from '../../../services/employee.service';
import {Config} from '../../../config';
import {MeiqiaService} from '../../../services/meiqia.service';
import {LogService} from '../../../services/log.service';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class AdminEmployeeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  admin;
  userInfo;
  employers;
  config = Config;
  count = {
    msg: 0
  };

  constructor(private router: Router,
              private storageSvc: StorageService,
              private wx: WxService,
              private userSvc: UserService,
              private employee: EmployeeService,
              private contactSvc: MeiqiaService,
              private logSvc: LogService) {
  }

  ngOnInit() {

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

    this.user = this.userSvc.isLogin();
    this.employee.getHousekeeper(this.user.housekeeperId).then(res => {
      this.userInfo = res.housekeeper;
      this.admin = res.isUser;
    });
    this.employee.getEmployer(this.user.housekeeperId, 2).then(res => {
      this.employers = res.list;
    });
    this.employee.getCount(this.user.id).then(res => {
      this.count.msg = res.msgCount;
    });

    const sto = JSON.parse(this.storageSvc.get('user'));
    console.log(sto);

    this.logSvc._log('error', sto).then();
  }

  contact() {
    this.contactSvc.show();
  }

  logout() {
    this.storageSvc.clear();
    this.router.navigate(['/admin/login']);
  }
}
