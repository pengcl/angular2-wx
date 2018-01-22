import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WXService} from '../../services/wx.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class AppPayComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;

  constructor(private wx: WXService, private userSvc: UserService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      if (this.userId) {
        this.userSvc.getUser(this.userId).then(user => {
          this.user = user;
        });
      }
    }
  }

}
