import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {PageConfig} from './page.config';
import {ActivatedRoute, Router} from '@angular/router';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';
import {OrderService} from '../../../../../services/order.service';

import {formatOrder} from '../../../../../utils/utils';
import {DialogService} from 'ngx-weui';

declare var $: any;

@Component({
  selector: 'app-admin-employer-order-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class AdminEmployerOrderSuccessComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  order;
  account;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService,
              private orderSvc: OrderService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.orderSvc.getOrder(this.activatedRoute.snapshot.params['id']).then(res => {
      this.order = formatOrder(res.cont);
      console.log(this.order);
    });

    this.orderSvc.getSurplusInfo(this.activatedRoute.snapshot.params['id']).then(res => {
      this.account = res.surplus;
      console.log(this.account);
    });
  }
}
