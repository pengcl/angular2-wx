import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';

import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-recruitment-msg-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class RecruitmentMsgSuccessComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user;

  constructor(private activatedRoute: ActivatedRoute,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
  }

  back() {
    window.history.back();
  }
}
