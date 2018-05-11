import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-admin-backend-resume-item-tys',
  templateUrl: './tys.component.html',
  styleUrls: ['./tys.component.scss']
})
export class AdminBackendResumeItemTysComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  trainee;
  params = {
    type: 1,
    id: ''
  };

  constructor(private route: ActivatedRoute, private userSvc: UserService,
              private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.params.id = this.route.snapshot.params['id'];
    this.traineeSvc.getRegInfo(this.params).then(res => {
      this.trainee = res.common;
      console.log(res);
    });
  }

  back() {
    window.history.back();
  }
}
