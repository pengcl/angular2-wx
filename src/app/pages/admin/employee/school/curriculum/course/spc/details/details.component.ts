import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../../../services/user.service';
import {SchoolService} from '../../../../../../../../services/school.service';

import {Config} from '../../../../../../../../config';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {DialogService} from 'ngx-weui';
import {map} from 'rxjs/internal/operators';

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
    this.activatedRoute.paramMap.pipe(map((params) => params.get('id'))).subscribe(id => {
      this.schoolSvc.getSpecial(id, this.user.id).then(res => {
        this.special = res.special;
        this.courses = res.list;
      });
    });

    /*this.schoolSvc.getCourse('', this.user.id).then(res => {
      if (res.code === 0) {
      }
    });*/
  }

}
