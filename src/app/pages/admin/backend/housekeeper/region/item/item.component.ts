import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';
import {Config} from '../../../../../../config';

import {UserService} from '../../../../../../services/user.service';
import {RegionService} from '../../../../../../services/backend/region.service';

@Component({
  selector: 'app-admin-backend-housekeeper-region-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminBackendHousekeeperRegionItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  config = Config;
  user: any;

  id;
  housekeepers;
  managers;
  inCharges;

  constructor(private route: ActivatedRoute,
              private userSvc: UserService,
              private regionSvc: RegionService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.id = this.route.snapshot.params['id'];

    this.regionSvc.getDetails(this.id).then(res => {
      console.log(res);
      this.inCharges = res.map.fzr;
      this.managers = res.map.manager;
      this.housekeepers = res.map.regionHousekeeper;
    });
  }

}
