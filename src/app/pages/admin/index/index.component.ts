import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WXService} from '../../../services/wx.service';
import {UserService} from '../../../services/user.service';
import {ButlerService} from '../../../services/butler.service';

@Component({
  selector: 'app-admin-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AdminIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  custId: string;
  custom: any;
  butlers: any[];

  constructor(private wx: WXService, private userSvc: UserService, private butler: ButlerService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.custId = this.userSvc.isLogin();
      this.userSvc.getCustom(this.custId).then(custom => {
        console.log(custom);
        this.custom = custom;
      });
    }
    this.butler.getHousekeepers().then(res => {
      if (res.code === 0) {
        this.butlers = res.list;
      }
      console.log(res);
      /*this.butlers = res.msg;
      console.log(res);*/
    });
  }

}
