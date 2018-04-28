import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {EmployeeService} from '../../../services/employee.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class AdminHomeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  constructor(private router: Router,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    console.log(this.user.housekeeperId);
    if (this.user.housekeeperId) {
      this.router.navigate(['/admin/employee'], {queryParamsHandling: 'merge'});
    } else {
      this.router.navigate(['/admin/employer'], {queryParamsHandling: 'merge'});
    }
  }

}
