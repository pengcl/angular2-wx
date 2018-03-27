import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../../services/user.service';
import {SchoolService} from '../../../../../../../services/school.service';

import {Config} from '../../../../../../../config';
import {ActivatedRoute} from '@angular/router';
import {DialogService} from 'ngx-weui';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-admin-employee-school-curriculum-course-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss', '../../../../../../../../../node_modules/swiper/dist/css/swiper.css']
})
export class AdminEmployeeSchoolCurriculumCourseListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  config = Config;

  // swiper
  current = 0;
  swiperConfig: SwiperConfigInterface = {
    slidesPerView: 'auto',
    centeredSlides: false,
    freeMode: true,
    keyboard: true,
    observer: true,
    mousewheel: true,
    scrollbar: false
  };

  // 翻页
  pageSize: number = 10;
  currPage: number = 1;
  currComments: any[];

  loading = false;
  catalog;
  catalogId;
  courses;
  parentId;

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private schoolSvc: SchoolService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.parentId = this.activatedRoute.snapshot.params['id'];
    this.catalogId = this.parentId;

    if (this.activatedRoute.snapshot.queryParams['catalogId']) {
      this.catalogId = this.activatedRoute.snapshot.queryParams['catalogId'];
    }

    this.schoolSvc.getCatalog(this.parentId).then(res => {
      this.catalog = res.list;
    });

    if (this.catalogId === this.parentId) {
      this.schoolSvc.getTypeList(this.catalogId, this.user.id).then(res => {
        this.courses = res.list;
      });
    } else {
      this.schoolSvc.getCatalog(this.catalogId).then(res => {
        this.courses = res.list;
      });
    }
  }

  setTab(catalogId) {
    this.catalogId = catalogId;
    if (this.catalogId === this.parentId) {
      this.schoolSvc.getTypeList(this.catalogId, this.user.id).then(res => {
        this.courses = res.list;
      });
    } else {
      this.schoolSvc.getCatalog(this.catalogId).then(res => {
        this.courses = res.list;
      });
    }
  }

  onIndexChange(index: number) {
    this.current = index;
  }

}
