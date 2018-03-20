import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {EmployeeService} from '../../../services/employee.service';
import {Config} from '../../../config';

@Component({
  selector: 'app-admin-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss']
})
export class AdminEmployeeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  userInfo;
  employers;
  config = Config;
  count = {
    msg: 0
  };

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employee: EmployeeService) {
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
    });
    this.employee.getEmployer(this.user.housekeeperId, 2).then(res => {
      this.employers = res.list;
    });
    this.employee.getCount(this.user.id).then(res => {
      this.count.msg = res.msgCount;
    });
  }
}
