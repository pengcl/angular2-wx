import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {UserService} from '../../../../../../../services/user.service';
import {EmployerService} from '../../../../../../../services/employer.service';

import {Config} from '../../../../../../../config';

@Component({
  selector: 'app-admin-employer-employees-employee-attendance-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class AdminEmployerEmployeesEmployeeAttendanceEmployeesComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user: any;
  employees;

  constructor(private userSvc: UserService,
              private employerSvc: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.employerSvc.getMyEmployees(this.user.id).then(res => {
      this.employees = res.list;
    });

  }

}
