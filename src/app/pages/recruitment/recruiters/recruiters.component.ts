import {Component, OnInit, OnDestroy, ViewEncapsulation, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';
import {Config} from '../../../config';

import {RecruitService} from '../../../services/recruit.service';
import {UserService} from '../../../services/user.service';
import {EmployerService} from '../../../services/employer.service';
import {EmployeeService} from '../../../services/employee.service';
import {DialogService, ToastService, InfiniteLoaderComponent} from 'ngx-weui';
import {WxService} from '../../../modules/wx';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {getIndex} from '../../../utils/utils';

@Component({
  selector: 'app-recruitment-recruiters',
  templateUrl: './recruiters.component.html',
  styleUrls: ['./recruiters.component.scss']
})
export class RecruitmentRecruitersComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  @ViewChild(InfiniteLoaderComponent) il;

  user;
  userInfo;

  recruiters = [];

  pageSize: number = 10;
  currPage: number = 1;
  currRecruiters: any[];

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

    this.recruit.getRecruiters(this.user.id)
      .then(res => {
        this.recruiters = res.list;
        this.currRecruiters = this.recruiters.slice(0, this.pageSize);
      });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currRecruiters = this.recruiters.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currRecruiters.length >= this.recruiters.length) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }
}
