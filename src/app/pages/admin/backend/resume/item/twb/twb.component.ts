import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';

@Component({
  selector: 'app-admin-backend-resume-item-twb',
  templateUrl: './twb.component.html',
  styleUrls: ['./twb.component.scss']
})
export class AdminBackendResumeItemTwbComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  trainee;
  params = {
    type: 2,
    id: ''
  };

  constructor(private route: ActivatedRoute, private userSvc: UserService,
              private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.params.id = this.route.snapshot.params['id'];
    this.traineeSvc.getRegInfo(this.params).then(res => {
      this.trainee = res.soldier;
      console.log(res);
    });
  }

  back() {
    window.history.back();
  }
}
