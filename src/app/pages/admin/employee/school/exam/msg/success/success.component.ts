import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../../services/user.service';

import {Config} from '../../../../../../../config';
import {Router, ActivatedRoute} from '@angular/router';
import {DialogService} from 'ngx-weui';
import {ExamService} from '../../../../../../../services/exam.service ';

@Component({
  selector: 'app-admin-employee-school-exam-msg-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class AdminEmployeeSchoolExamMsgSuccessComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user: any;
  examId;
  examInfo;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userSvc: UserService,
              private examSvc: ExamService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.examId = this.activatedRoute.snapshot.params['id'];

    this.examSvc.getExamInfo(this.examId, this.user.id).then(res => {
      console.log(res);
      this.examInfo = res.exam;
    });
  }

  back() {
    this.router.navigate(['/admin/employee/school/exam/index'], {queryParams: {tab: 1}});
  }

}
