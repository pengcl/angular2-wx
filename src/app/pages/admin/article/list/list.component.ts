
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {InfiniteLoaderComponent} from 'ngx-weui';

import {UserService} from '../../../../services/user.service';
import {EmployerService} from '../../../../services/employer.service';

@Component({
  selector: 'app-admin-article-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminArticleListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  isEmployee = false;
  isAdmin = false;

  constructor(private userSvc: UserService,
              private employerSvc: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.getStorageUser();
    if (this.user) {
      this.employerSvc.getEmployer(this.user.id).then(res => {
        if (res.code === 0) {
          this.isAdmin = res.isUser;
        }
        if (res.cust.custType === 0) {
          this.isEmployee = true;
        }
      });
    }
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {

    });
  }
}
