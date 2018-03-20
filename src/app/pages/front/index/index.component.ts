import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';
import {DialogService} from 'ngx-weui';
import {WxService} from '../../../modules/wx';
import 'rxjs/add/observable/timer';

import {InfiniteLoaderComponent} from 'ngx-weui';
import {EmployeeService} from '../../../services/employee.service';

@Component({
  selector: 'app-front-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class FrontIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  employees;

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private dialog: DialogService,
              private wx: WxService,
              private employeeSvc: EmployeeService) {
  }


  ngOnInit() {
    this.wx.config({}).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      // this.status = `注册失败，原因：${err}`;
    });

    this.employeeSvc.getHousekeepers().then(res => {
      if (res.code === 0) {
        this.employees = res.list;
      }
    });
  }

}
