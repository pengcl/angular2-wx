import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {HousekeeperService} from '../../../../../../services/backend/housekeeper.service';
import {WorkService} from '../../../../../../services/work.service';


@Component({
  selector: 'app-admin-backend-housekeeper-week-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminBackendHousekeeperWeekItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  weeks;
  housekeeperName;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private userSvc: UserService,
              private housekeeperSvc: HousekeeperService,
              private workSvc: WorkService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.workSvc.getWeeks(this.route.snapshot.params['id'], 1).then(res => {
      this.weeks = res.list;
    });

    this.housekeeperSvc.getDetail(this.route.snapshot.params['id']).then(res => {
      this.housekeeperName = res.housekeeper.name;
      console.log(res);
    });
  }

  back() {
    this.location.back();
  }
}
