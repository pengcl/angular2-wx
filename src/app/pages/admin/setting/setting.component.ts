import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {WXService} from '../../../services/wx.service';
import {UserService} from '../../../services/user.service';
import {ButlerService} from '../../../services/butler.service';
import {Config} from '../../../config';
import {getIndex} from '../../../utils/utils';

declare var $: any;
declare var F2: any;

@Component({
  selector: 'app-admin-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class AdminSettingComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  config = Config;

  userId: string;
  user: any;

  show: boolean = false;

  images;
  galleryCurrent = 0;

  housekeeper: any;

  constructor(private route: ActivatedRoute,
              private wx: WXService,
              private userSvc: UserService,
              private butlerSvc: ButlerService) {
  }

  showGallery(current) {
    this.show = true;
    this.galleryCurrent = current;
  }

  onDelete(current: any) {
    this.butlerSvc.delImage({imageid: this.housekeeper.imageList[current].imageid}).then(res => {
      this.images.splice(current, 1);
      this.housekeeper.imageList.splice(current, 1);
    });
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }

    this.butlerSvc.getHousekeeper('10000096750345').then(housekeeper => {
      this.housekeeper = JSON.parse((JSON.parse(housekeeper)).msg);
      const images = [];
      $.each(this.housekeeper.imageList, function (i, k) {
        images.push(k.imageurl);
      });
      this.images = images;
    });
  }

}
