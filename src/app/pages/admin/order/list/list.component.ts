import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {PageConfig} from './page.config';
import {WXService} from '../../../../services/wx.service';
import {UserService} from '../../../../services/user.service';
import {ORDERLIST} from '../../../../../mockData/orderList';

declare var $: any;

@Component({
  selector: 'app-admin-order-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminOrderListComponent implements OnInit {
  agreementForm: FormGroup;
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;

  orderList: any[];

  selectedIndex: number = 0;

  onSelected(index) {
    if (this.selectedIndex === index) {
      this.selectedIndex = -1;
    } else {
      this.selectedIndex = index;
    }
  }

  constructor(private wx: WXService, private userSvc: UserService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }
    this.orderList = ORDERLIST;
    console.log(this.orderList);
  }

}
