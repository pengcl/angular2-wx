import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './../../../page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MoService} from '../../../../services/mo.service';
import {EmployeeService} from '../../../../services/employee.service';

import {simAnim, slide} from '../../../../utils/animate';

import {InfiniteLoaderComponent} from 'ngx-weui';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-front-guide-step3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.scss'],
  animations: [simAnim, slide]
})
export class FrontGuideStep3Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  gh = '';
  employees;

  pageSize: number = 6;
  currPage: number = 1;
  currLists: any[];
  lists: any[];
  isLast = false;

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private router: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employeeSvc: EmployeeService) {
    this.navBarConfig.navigationBarTitleText = '为您推荐管家';
  }

  ngOnInit() {
    this.gh = this.router.snapshot.queryParams['gh'];
    this.employeeSvc.getHousekeepers({
      serviceAreaName: this.router.snapshot.queryParams['city'],
      workTypeNames: this.router.snapshot.queryParams['capabilities']
    }).then(res => {
      this.employees = res.list;
      this.lists = res.list;
      this.currLists = res.list.slice(0, this.pageSize);
    });

  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currLists = this.lists.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currLists.length >= this.lists.length) {
        comp.setFinished();
        this.isLast = true;
        return;
      }

      comp.resolveLoading();
    });
  }

}
