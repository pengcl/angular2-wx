import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../services/user.service';
import {WorkService} from '../../../../../services/work.service';
import {Config} from '../../../../../config';

declare var $: any;

@Component({
  selector: 'app-admin-employee-work-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminEmployeeWorkItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  config = Config;
  user: any;

  weeklyId = '';
  week;

  constructor(private route: ActivatedRoute,
              private userSvc: UserService,
              private workSvc: WorkService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.workSvc.getWeek(this.route.snapshot.params['id']).then(res => {
      if (res.code === 0) {
        this.week = res.weekly;
      }
    });
  }

}
