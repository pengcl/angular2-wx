import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../../../services/user.service';
import {SchoolService} from '../../../../../../../../services/school.service';

import {ActivatedRoute} from '@angular/router';
import {DialogService} from 'ngx-weui';

import {Config} from '../../../../../../../../config';

@Component({
  selector: 'app-admin-employee-school-curriculum-course-spc-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminEmployeeSchoolCurriculumCourseSpcListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user: any;

  specialList;

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private schoolSvc: SchoolService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.schoolSvc.getSpcList().then(res => {
      if (res.code === 0) {
        this.specialList = res.list;
      }
    });
  }

  onSubmit() {
  }

}
