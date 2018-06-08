import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {Config} from '../../../../config';

@Component({
  selector: 'app-admin-salesmen-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class AdminSalesmenSuccessComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  config = Config;

  constructor(private wx: WxService,
              private userSvc: UserService) {
  }

  ngOnInit() {
  }
}
