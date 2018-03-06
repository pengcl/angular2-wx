import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../services/user.service';
import {EmployeeService} from '../../../../../../services/employee.service';

import {DatePipe} from '@angular/common';
import {DateService} from '../../../../../../services/date.service';
import {formatAttendance, getDays} from '../../../../../../utils/utils';
import {GeoService} from '../../../../../../services/geo.service';
import {MoService} from '../../../../../../services/mo.service';

import {Config} from '../../../../../../config';

declare var qq: any;

interface DateItem {
  now: any; // 当前时间
  day: number; // 当前日期
  month: number; // 当前月份
  year: number;
  week: number; // 当前星期几
  count?: number; // 当前月份有几天
}

@Component({
  selector: 'app-admin-employer-employees-employee-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss'],
  providers: [DatePipe]
})
export class AdminEmployerEmployeesEmployeeAttendanceComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  dateNow: any = new Date(); // 当前时间

  currDateItem: DateItem = {
    now: this.dateNow,
    day: this.dateNow.getDate(),
    month: this.dateNow.getMonth() + 1,
    year: this.dateNow.getFullYear(),
    week: this.dateNow.getDay(),
    count: this.date.getCountDays(this.dateNow)
  };

  items;

  user: any;

  location: any = {};
  employee;
  signInfo;
  attendance;

  constructor(private router: ActivatedRoute,
              private datePipe: DatePipe,
              private date: DateService,
              private geo: GeoService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employeeSvc: EmployeeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.items = getDays(new Date());

    this.employeeSvc.getHousekeeper(this.router.snapshot.paramMap.get('id')).then(res => this.employee = res.housekeeper).then(employee => {
      this.employeeSvc.getSignInfo(employee.housekeeperid).then(res => {
        if (res.code === 0) {
          this.signInfo = res.housekeeperSign;
          // this.attendance = formatAttendance(res.housekeeperSign);
        }
      });
    });
  }

  getSignInfo(item) {
    this.currDateItem = item;
    const signDate = item.year + '-' + (item.month <= 9 ? '0' + item.month : item.month) + '-' + (item.day <= 9 ? '0' + item.day : item.day);
    this.employeeSvc.getSomedaySignInfo(this.user.housekeeperId, signDate).then(res => {
      if (res.code === 0) {
        this.signInfo = res.housekeeperSign;
      }
    });
  }

  getPrevMonth() {
    this.items = getDays(this.items.prev[0].now);
  }

  getNextMonth() {
    this.items = getDays(this.items.next[0].now);
  }

}
