import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {UserService} from '../../../services/user.service';
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
    if (this.user.housekeeperId) {
      this.router.navigate(['/admin/employee'], {queryParamsHandling: 'merge'});
    } else {
      this.router.navigate(['/admin/employer'], {queryParamsHandling: 'merge'});
    }
  }

}
