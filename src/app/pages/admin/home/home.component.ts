import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {UserService} from '../../../services/user.service';
import {EmployerService} from '../../../services/employer.service';
import {StorageService} from '../../../services/storage.service';
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
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private storageSvc: StorageService) {
  }

  ngOnInit() {
    this.storageSvc.clear();
    this.user = this.userSvc.isLogin();
    this.employerSvc.getEmployer(this.user.id).then(res => {
      if (res.cust.custType === 0) {
        this.router.navigate(['/admin/employee'], {queryParamsHandling: 'merge'});
      } else if (res.cust.custType === 1) {
        this.router.navigate(['/admin/employer'], {queryParamsHandling: 'merge'});
      } else {
        if (res.cust.agentAuditStatus === 1) {
          this.router.navigate(['/admin/salesmen/home'], {queryParamsHandling: 'merge'});
        } else {
          this.router.navigate(['/admin/employer'], {queryParamsHandling: 'merge'});
        }
      }
    });
  }

}
