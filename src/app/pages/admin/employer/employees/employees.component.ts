import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MoService} from '../../../../services/mo.service';
import {EmployerService} from '../../../../services/employer.service';

import {Config} from '../../../../config';
import {InfiniteLoaderComponent} from 'ngx-weui';
import {Observable} from 'rxjs/Observable';

declare var $: any;
declare var mojs: any;

const OPTS = {
  fill: 'none',
  radius: 25,
  strokeWidth: {50: 0},
  scale: {0: 1},
  duration: 500,
  left: 0, top: 0,
  easing: 'cubic.out'
};

@Component({
  selector: 'app-admin-employer-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class AdminEmployerEmployeesComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user: any;

  filter: number | string [] = ['', '', ''];
  employees;
  listType = 'list';

  pageSize: number = 6;
  currPage: number = 1;
  currEmployees: any[];

  constructor(private wx: WxService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employerSvc: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.employerSvc.getMyEmployees(this.user.id).then(res => {
      this.employees = res.list;
    });

  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currEmployees = this.employees.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currEmployees.length >= this.employees.length) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }

}
