import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployeeService} from '../../../../services/employee.service';
import {MeiqiaService} from '../../../../services/meiqia.service';

@Component({
  selector: 'app-admin-employee-adm',
  templateUrl: './adm.component.html',
  styleUrls: ['./adm.component.scss']
})
export class AdminEmployeeADMComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  order;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employee: EmployeeService,
              private meiqiaSvc: MeiqiaService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employee.getOrders(this.user.housekeeperId).then(res => {
      if (res.code === 0) {
        this.order = res.list.filter(k => {
          return k.constatus === 2;
        })[0];
      }
    });
  }

  contact() {
    this.meiqiaSvc.show();
  }
}
