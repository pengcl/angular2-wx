import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {UserService} from '../../../../services/user.service';
import {EmployeeService} from '../../../../services/employee.service';

@Component({
  selector: 'app-admin-employee-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class AdminEmployeeOrdersComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  orders;
  validOrders;
  invalidOrders;

  conStatus = 'now';

  constructor(private userSvc: UserService,
              private employee: EmployeeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employee.getOrders(this.user.housekeeperId).then(res => {
      this.orders = res.list;
      this.validOrders = this.orders.filter(k => {
        return k.constatus === 2;
      });
      this.invalidOrders = this.orders.filter(k => {
        return k.constatus === 4;
      });
    });
  }

  setConStatus(status) {
    this.conStatus = status;
  }
}
