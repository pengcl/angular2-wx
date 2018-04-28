import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../services/user.service';
import {ExamService} from '../../../../../../services/exam.service ';

import {Config} from '../../../../../../config';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-admin-employee-school-exam-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class AdminEmployeeSchoolExamPreviewComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user;

  leftTime;
  process = 0;
  examId;
  examSingleQuestions;
  examMultiListQuestions;
  examForm: FormGroup;

  loading: boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private examSvc: ExamService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.examId = this.activatedRoute.snapshot.params['id']; // examId

    this.examForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      examId: new FormControl('', [Validators.required]),
      signUpId: new FormControl('', [Validators.required])
    });

    this.examForm.get('custId').setValue(this.user.id); // custId
    this.examForm.get('examId').setValue(this.examId); // examId

    this.examSvc.getExamInfo(this.examId, this.user.id).then(info => {
      this.examForm.get('signUpId').setValue(info.signUp.signupid); // signUpId
      this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.examSvc.getExamInfo(this.examId, this.user.id, info.signUp.signupid).then(res => {
          this.leftTime = ((start) => {
            start = Date.parse(start.replace(/\-/g, '/'));
            const leftTime = (start - Date.parse(new Date().toString())) + 3600000;
            return leftTime / 1000;
          })(res.signUp.begintime);

          this.examSingleQuestions = {
            type: 'single',
            list: res.singlList,
            length: res.singlList.length,
            credits: ((lists) => {
              let result = 0;
              lists.forEach(item => {
                result = result + item.credits;
              });
              return result;
            })(res.singlList)
          };

          this.examMultiListQuestions = {
            type: 'multi',
            list: res.multiList,
            length: res.multiList.length,
            credits: ((lists) => {
              let result = 0;
              lists.forEach(item => {
                result = result + item.credits;
              });
              return result;
            })(res.multiList)
          };

          this.process = ((arrA, arrB) => {
            const len = arrA.length + arrB.length;
            let num = 0;
            arrA.forEach(item => {
              if (item.optioned) {
                num = num + 1;
              }
            });
            arrB.forEach(item => {
              if (item.optioned) {
                num = num + 1;
              }
            });
            return num / len * 100;
          })(this.examSingleQuestions.list, this.examMultiListQuestions.list);
        });
      });
    });
  }

  back() {
    window.history.back();
  }

  submit() {
    if (this.loading) {
      return false;
    }
    this.loading = true;

    if (this.process === 100) {
      this.dialog.show({
        title: '系统提示',
        content: '是否确认交卷',
        cancel: '不交卷',
        confirm: '我要交卷'
      }).subscribe(data => {
        this.loading = false;
        if (data.value) {
          this.examSvc.submit(this.examForm.value).then(res => {
            console.log(res);
          });
        }
      });
    } else {
      this.dialog.show({
        title: '系统提示',
        content: '您还有题未回答，是否确认交卷',
        cancel: '不交卷',
        confirm: '我要交卷'
      }).subscribe(data => {
        this.loading = false;
        if (data.value) {
          this.examSvc.submit(this.examForm.value).then(res => {
            console.log(res);
          });
        }
      });
    }
  }

}
