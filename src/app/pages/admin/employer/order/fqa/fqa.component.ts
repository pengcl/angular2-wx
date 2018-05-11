import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../services/user.service';

@Component({
  selector: 'app-admin-employer-order-fqa',
  templateUrl: './fqa.component.html',
  styleUrls: ['./fqa.component.scss']
})
export class AdminEmployerOrderFqaComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  constructor(private router: Router,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
  }
}
