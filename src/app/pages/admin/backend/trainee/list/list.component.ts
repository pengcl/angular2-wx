import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {TraineeService} from '../../../../../services/backend/trainee.service';

@Component({
  selector: 'app-admin-backend-trainee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendTraineeListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  trainees: any[] = [];

  constructor(private userSvc: UserService, private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.traineeSvc.getTrainees({custId: this.user.id}).then(res => {
      if (res.code === 0) {
        this.trainees = res.list;
        console.log(this.trainees);
      }
    });
  }

  onLoadMore(e) {
  }
}
