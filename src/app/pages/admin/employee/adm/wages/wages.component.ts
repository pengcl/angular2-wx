import {Component, OnInit, OnDestroy} from '@angular/core';
import {PageConfig} from './page.config';
import {UserService} from '../../../../../services/user.service';
import {PickerService} from '../../../../../modules/picker';
import {DatePipe} from '@angular/common';

import {EmployeeService} from '../../../../../services/employee.service';

@Component({
  selector: 'app-admin-employee-adm-wages',
  templateUrl: './wages.component.html',
  styleUrls: ['./wages.component.scss'],
  providers: [DatePipe]
})
export class AdminEmployeeADMWagesComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  wages;
  dateMonth;

  constructor(private userSvc: UserService,
              private picker: PickerService,
              private datePipe: DatePipe,
              private employee: EmployeeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    const now = new Date();
    this.dateMonth = now.getFullYear() + '-' + ((now.getMonth() < 9) ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1));
    this.employee.getWages({
      housekeeperId: this.user.housekeeperId,
      dateMonth: this.dateMonth.replace(/-/gi, '')
    }).then(res => {
      this.wages = res[0];
    });
  }

  onPickerShow() {
    this.picker.showDateTime('date-ym').subscribe((res: any) => {
      console.log(res.formatValue.replace(/-/gi, ''));
    });
  }

  ngOnDestroy() {
    this.picker.destroy();
  }

}
