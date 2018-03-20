import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {SchoolService} from '../../../../../services/school.service';

import {Config} from '../../../../../config';

@Component({
  selector: 'app-admin-employee-school-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AdminEmployeeSchoolIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  specialList;
  hotList;
  catalogList;
  newList;

  config = Config;

  constructor(private wx: WxService, private userSvc: UserService, private schoolSvc: SchoolService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.schoolSvc.getHomes().then(res => {
      console.log(res);
      if (res.code === 0) {
        this.specialList = res.specialList;
        this.hotList = res.hotList;
        this.catalogList = res.catalogList;
        this.newList = res.newList;
      }
    });
  }

}
