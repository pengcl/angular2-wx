import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../services/user.service';
import {ExamService} from '../../../../../../services/exam.service ';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';

import {Config} from '../../../../../../config';

const getExamTag = function (regStartTime, regEndTime, startTime, endTime, signUp) {
  let result;
  const dateNow = Date.parse(new Date().toString());
  regStartTime = Date.parse(regStartTime.replace(/\-/g, '/'));
  regEndTime = Date.parse(regEndTime.replace(/\-/g, '/'));
  startTime = Date.parse(startTime.replace(/\-/g, '/'));
  endTime = Date.parse(endTime.replace(/\-/g, '/'));

  if (startTime > dateNow && endTime > dateNow) {
    result = {
      result: true,
      txt: '考试未开始',
      buttonTxt: '等待开考'
    };
  }
  if (dateNow > startTime && endTime > dateNow) {
    result = {
      result: true,
      txt: '考试中',
      buttonTxt: '开始考试'
    };
  }
  if (dateNow > endTime) {
    result = {
      result: false,
      txt: '考试已结束',
      buttonTxt: '已结束'
    };
  }

  return result;
};

@Component({
  selector: 'app-admin-employee-school-exam-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss', '../../../../../../../../node_modules/swiper/dist/css/swiper.css']
})
export class AdminEmployeeSchoolExamIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user;
  category;
  papers;
  myPapers;

  courseId = 0;
  tabIndex = 0;

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

  constructor(private activatedRoute: ActivatedRoute,
              private userSvc: UserService,
              private examSvc: ExamService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.tabIndex = this.activatedRoute.snapshot.queryParams['tab'] ? this.activatedRoute.snapshot.queryParams['tab'] : 0;
    this.examSvc.getPapers().then(res => {
      this.papers = res.list;
    });

    this.examSvc.getMyPapers(this.user.id).then(res => {
      this.myPapers = res.list;
    });

    this.examSvc.getCategoryList().then(res => {
      this.category = res.list;
    });
  }

  setMainTab(tabIndex) {
    this.tabIndex = tabIndex;
  }

  setSubTab(id?) {
    this.courseId = id;
    this.examSvc.getPapers(id).then(res => {
      this.papers = res.list;
    });
  }

  getTestTag(endTime) { // 考试是否已经结束
    endTime = endTime.replace(/\-/g, '/');
    return Date.parse(endTime) - Date.parse(new Date().toString()) < 0 ? true : false;
  }

  isTestStart(startTime) {
    startTime = startTime.replace(/\-/g, '/');
    return Date.parse(new Date().toString()) > Date.parse(startTime) ? true : false;
  }

  isTestEnd(endTime) { // 考试是否已经结束
    endTime = endTime.replace(/\-/g, '/');
    return Date.parse(new Date().toString()) > Date.parse(endTime) ? true : false;
  }

  isTestOn(startTime, endTime) {
    const dateNow = Date.parse(new Date().toString());
    startTime = Date.parse(startTime.replace(/\-/g, '/'));
    endTime = Date.parse(endTime.replace(/\-/g, '/'));

    if (dateNow >= startTime && dateNow <= endTime) {
    }
    return dateNow >= startTime && dateNow <= endTime ? true : false;
  }
}
