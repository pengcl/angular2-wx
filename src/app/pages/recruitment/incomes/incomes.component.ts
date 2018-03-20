import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {PageConfig} from './page.config';
import {Config} from '../../../config';

import {RecruitService} from '../../../services/recruit.service';
import {UserService} from '../../../services/user.service';
import {EmployerService} from '../../../services/employer.service';
import {EmployeeService} from '../../../services/employee.service';
import {DialogService, ToastService} from 'ngx-weui';
import {WxService} from '../../../modules/wx';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-recruitment-incomes',
  templateUrl: './incomes.component.html',
  styleUrls: ['./incomes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecruitmentIncomesComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user;
  userInfo;

  incomes = [];

  status: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userSvc: UserService,
              private recruit: RecruitService,
              private employer: EmployerService,
              private employee: EmployeeService,
              private dialog: DialogService,
              private toast: ToastService,
              private wx: WxService) {
  }

  ngOnInit() {

    this.wx.config({
      title: '大牛管家诚聘优才',
      desc: '欢迎广大有志于高端管家助理服务的退伍军人，体育专业毕业生踊跃报名！',
      link: Config.webHost + '/front/resume/job',
      imgUrl: Config.webHost + '/assets/images/front/resume/share-icon.png'
    }).then(() => {
      console.log(true);
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(err);
      // this.status = `注册失败，原因：${err}`;
    });

    this.user = this.userSvc.isLogin();

    this.userInfo = this.employer.getEmployer(this.user.id).then(res => {
      this.userInfo = res.cust;
      console.log(this.userInfo);
    });

    this.recruit.getIncomes(this.user.id).then(res => {
      if (res.code === 0) {
        this.incomes = res;
      }
      console.log(res);
    });
  }

  onShare(gh, state) {
    this.wx.config({
      title: '大牛管家诚聘优才',
      desc: '欢迎广大有志于高端管家助理服务的退伍军人，体育专业毕业生踊跃报名！',
      link: Config.webHost + '/front/resume/job?gh=' + gh + '&referee=' + this.user.id,
      imgUrl: Config.webHost + '/assets/images/front/resume/share-icon.png'
    }).then(() => {
      console.log(true);
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(err);
      // this.status = `注册失败，原因：${err}`;
    });
    this.wx.show(state).subscribe(res => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    this.wx.destroyAll();
  }
}
