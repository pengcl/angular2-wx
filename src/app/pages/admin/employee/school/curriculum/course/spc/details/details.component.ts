import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../../../services/user.service';
import {SchoolService} from '../../../../../../../../services/school.service';

import {Config} from '../../../../../../../../config';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-admin-employee-school-curriculum-course-spc-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AdminEmployeeSchoolCurriculumCourseSpcDetailsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  config = Config;
  special;
  courses;

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private schoolSvc: SchoolService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.activatedRoute.paramMap.switchMap((params: ParamMap) => this.schoolSvc.getSpecial(params.get('id'), this.user.id)).subscribe(res => {
      this.special = res.special;
      this.courses = res.list;
    });

    this.schoolSvc.getCourse('', this.user.id).then(res => {
      if (res.code === 0) {
      }
    });
  }

}
