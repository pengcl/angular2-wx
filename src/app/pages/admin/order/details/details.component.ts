import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WXService} from '../../../../services/wx.service';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-admin-order-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AdminOrderDetailsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;

  public count: number = 0;

  constructor(private wx: WXService, private userSvc: UserService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }
  }

  /*toggleAgree() {
    this.agreementForm.value.agree = !this.agreementForm.value.agree;
  }

  onSubmit() {
    if (this.agreementForm.valid) {
      console.log(this.agreementForm.value);
    }
  }*/

}
