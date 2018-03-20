import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../../services/user.service';
import {SchoolService} from '../../../../../../../services/school.service';

import {Config} from '../../../../../../../config';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-admin-employee-school-curriculum-course-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminEmployeeSchoolCurriculumCourseItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  config = Config;
  courseId;
  course;
  courseCatalog;

  joinForm: FormGroup;

  loading = false;

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private schoolSvc: SchoolService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.courseId = this.activatedRoute.snapshot.params['id'];

    this.joinForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      catalogId: new FormControl('', [Validators.required])
    });

    this.schoolSvc.getCourseItem(this.courseId).then(res => {
      if (res.code === 0) {
        this.course = res.course;
        this.schoolSvc.getCourseCatalog(this.course.coursecatalogid).then(data => {
          if (res.code === 0) {
            this.courseCatalog = data.list;
            console.log(res);
          }
        });
      }
    });
  }


  onSubmit() {
  }

}
