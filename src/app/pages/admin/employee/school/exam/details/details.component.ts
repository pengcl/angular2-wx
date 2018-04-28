import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../services/user.service';

import {Config} from '../../../../../../config';
import {Router, ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogService} from 'ngx-weui';
import {ExamService} from '../../../../../../services/exam.service ';
import {EmployeeService} from '../../../../../../services/employee.service';

const getExamTag = function (regStartTime, regEndTime, startTime, endTime, signUp) {
  let result;
  const dateNow = Date.parse(new Date().toString());
  regStartTime = Date.parse(regStartTime.replace(/\-/g, '/'));
  regEndTime = Date.parse(regEndTime.replace(/\-/g, '/'));
  startTime = Date.parse(startTime.replace(/\-/g, '/'));
  endTime = Date.parse(endTime.replace(/\-/g, '/'));

  if (signUp) {
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

      if (signUp.submitstatus) {
        result = {
          result: false,
          txt: '考试进行中',
          buttonTxt: '已交卷，待公布成绩'
        };

        if (signUp.isopen === 2) {
          result = {
            result: true,
            txt: '考试进行中',
            buttonTxt: '已交卷，查看成绩'
          };
        }
      }
    }
    if (dateNow > endTime) {
      result = {
        result: false,
        txt: '考试已结束',
        buttonTxt: '已结束，查看成绩'
      };

      if (signUp.submitstatus) {
        result = {
          result: false,
          txt: '考试已结束',
          buttonTxt: '已交卷，待公布成绩'
        };

        if (signUp.isopen === 2) {
          result = {
            result: true,
            txt: '考试已结束',
            buttonTxt: '已结束，查看成绩'
          };
        }
      } else {
        result = {
          result: false,
          txt: '考试已结束',
          buttonTxt: '未交卷，无法查看成绩'
        };
      }
    }
  } else {
    result = {
      result: true,
      txt: '报名中',
      buttonTxt: '马上报名'
    };

    if (regStartTime > dateNow) {
      result = {
        result: false,
        txt: '报名未开始',
        buttonTxt: '报名未开始'
      };
    }
    if (dateNow > regEndTime) {
      result = {
        result: false,
        txt: '报名已截止',
        buttonTxt: '已截止，未报名'
      };
    }

    if (dateNow > regStartTime && dateNow < regEndTime) {
      result = {
        result: true,
        txt: '报名中',
        buttonTxt: '马上报名'
      };
    }
  }

  return result;
};

@Component({
  selector: 'app-admin-employee-school-exam-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AdminEmployeeSchoolExamDetailsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user: any;
  housekeeper;
  exam;
  examId;
  examInfo;
  signUp;
  examTag;
  examForm: FormGroup;
  loading: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private examSvc: ExamService,
              private employeeSvc: EmployeeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.examId = this.activatedRoute.snapshot.params['id'];

    this.examForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      examId: new FormControl('', [Validators.required])
    });

    this.examForm.get('custId').setValue(this.user.id);

    this.getData();

    /*this.examSvc.getExamInfo(this.examId, this.user.id).then(res => {
      this.exam = res;
      this.examInfo = res.exam;
      this.signUp = res.signUp;
      this.examTag = getExamTag(res.exam.regbegintime, res.exam.regendtime, res.exam.begintime, res.exam.endtime, res.signUp);
      this.examForm.get('examId').setValue(this.examInfo.examid);

      if (this.examTag.buttonTxt === '等待开考') {
        this.dialog.show({
          title: '温馨提示',
          content: '<p>您已报名，请注意在考试时间内登录进行考试</p><p>可在“我的考试”页面中查看已报名的考试</p>',
          cancel: '',
          confirm: '确定'
        }).subscribe(data => {
        });
      }
    });*/

  }

  getData() {
    this.examSvc.getExamInfo(this.examId, this.user.id).then(res => {
      this.exam = res;
      this.examInfo = res.exam;
      this.signUp = res.signUp;
      this.examTag = getExamTag(res.exam.regbegintime, res.exam.regendtime, res.exam.begintime, res.exam.endtime, res.signUp);
      this.examForm.get('examId').setValue(this.examInfo.examid);

      if (this.examTag.buttonTxt === '等待开考') {
        this.dialog.show({
          title: '温馨提示',
          content: '<p>您已报名，请注意在考试时间内登录进行考试</p><p>可在“我的考试”页面中查看已报名的考试</p>',
          cancel: '',
          confirm: '确定'
        }).subscribe(data => {
        });
      }
    });
  }

  getTestTag() { // 考试是否已经结束

  }

  onSubmit(btx) {
    if (this.loading) {
      return false;
    }
    this.loading = true;
    if (this.examForm.valid) {
      if (btx === '开始考试') {
        this.loading = false;
        this.examSvc.start(this.signUp.signupid).then(res => {
          if (this.exam.singlList.length > 0) {
            this.router.navigate(['/admin/employee/school/exam/on', this.examId], {queryParams: {type: 'single', idx: 0}});
          }
        });
      } else if (btx === '已结束，查看成绩') {
        this.router.navigate(['/admin/employee/school/exam/result', this.examId], {});
      } else if (btx === '等待开考') {
        this.loading = false;
        return false;
      } else if (btx === '报名未开始') {
        this.loading = false;
        return false;
      } else if (btx === '已截止，未报名') {
        this.loading = false;
        return false;
      } else if (btx === '已交卷，待公布成绩') {
        this.loading = false;
        return false;
      } else if (btx === '已交卷，查看成绩') {
        this.loading = false;
        this.router.navigate(['/admin/employee/school/exam/result', this.examId], {});
        return false;
      } else if (btx === '未交卷，无法查看成绩') {
        this.loading = false;
        return false;
      } else {
        this.examSvc.signUp(this.examForm.value).then(res => {
          this.loading = false;
          let _config = {
            title: '报名成功',
            content: `<p>请注意在考试时间内登录进行考试</p><p>可在“我的考试”页面中查看已报名的考试</p>`,
            cancel: '',
            confirm: '确定'
          };
          if (res.code === 0) {
            this.getData();
          } else {
            _config = {
              title: '报名失败',
              content: res.msg,
              cancel: '',
              confirm: '我知道了'
            };
          }
          this.dialog.show(_config).subscribe(data => {
          });
        });
      }
    }
  }

}
