import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployerService} from '../../../../services/employer.service';
import {Config} from '../../../../config';

@Component({
  selector: 'app-admin-salesmen-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss']
})
export class AdminSalesmenQrComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  userInfo;
  config = Config;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employerSvc: EmployerService) {
  }

  ngOnInit() {

    this.user = this.userSvc.isLogin();
    this.employerSvc.getEmployer(this.user.id).then(res => {
      this.userInfo = res.cust;
      console.log(this.userInfo);
    });
  }
}
