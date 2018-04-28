import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {PageConfig} from './page.config';
import {Config} from '../../../../../../config';
import {UserService} from '../../../../../../services/user.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ExamService} from '../../../../../../services/exam.service ';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-admin-employee-school-exam-on',
  templateUrl: './on.component.html',
  styleUrls: ['./on.component.scss']
})
export class AdminEmployeeSchoolExamOnComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user;

  examId;
  examInfo;
  examSingleQuestions;
  examMultiListQuestions;
  examQuestions;
  examQuestionsIdx: number;
  examQuestion;
  questionsType;
  optionIds = [];
  process: number = 0; // 进度
  isLast = false; // 是否最后一题
  isEnd: number = 0; // 是否交卷
  examForm: FormGroup;
  signUp; // 报名数据
  leftTime; // 考试剩余时间
  loading: boolean = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
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
      signUpId: new FormControl('', [Validators.required]),
      titleId: new FormControl('', [Validators.required]),
      optionId: new FormControl('', [Validators.required])
    });

    this.examForm.get('custId').setValue(this.user.id); // custId

    /*this.activatedRoute.queryParamMap.subscribe((res: ParamMap) => {
      this.examQuestionsIdx = parseInt(res.get('idx'), 10);
      this.questionsType = res.get('type');
    });*/
    this.examSvc.getExamInfo(this.examId, this.user.id).then(info => {
      this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.examSvc.getExamInfo(this.examId, this.user.id, info.signUp.signupid).then(res => {
          this.examInfo = res.exam;
          this.optionIds = [];
          this.signUp = res.signUp;
          this.isEnd = res.signUp.submitstatus;
          this.leftTime = ((start) => {
            start = Date.parse(start.replace(/\-/g, '/'));
            const leftTime = (start - Date.parse(new Date().toString())) + 3600000;
            return leftTime / 1000;
          })(res.signUp.begintime);
          this.examSingleQuestions = res.singlList;
          this.examMultiListQuestions = res.multiList;
          this.examForm.get('signUpId').setValue(res.signUp.signupid); // signUpId
          this.examForm.get('examId').setValue(this.examInfo.examid); // examId

          this.examQuestionsIdx = parseInt(params.get('idx'), 10);
          this.questionsType = params.get('type');
          const questions = {
            type: '',
            list: [],
            length: 0,
            credits: 0
          };
          if (this.questionsType === 'single') {
            questions.type = 'single';
            questions.list = this.examSingleQuestions;
            questions.length = this.examSingleQuestions.length;
            questions.credits = ((lists) => {
              let result = 0;
              lists.forEach(item => {
                result = result + item.credits;
              });
              return result;
            })(this.examSingleQuestions);
          } else {
            questions.type = 'multi';
            questions.list = this.examMultiListQuestions;
            questions.length = this.examMultiListQuestions.length;
            questions.credits = ((lists) => {
              let result = 0;
              lists.forEach(item => {
                result = result + item.credits;
              });
              return result;
            })(this.examMultiListQuestions);
          }
          /*questions.list = questions.list.sort((a, b) => {
            return parseInt(b.titleno, 10) - parseInt(a.titleno, 10);
          });*/
          this.examQuestions = questions;
          this.examQuestion = this.examQuestions.list[this.examQuestionsIdx];
          this.examForm.get('titleId').setValue(this.examQuestion.titleid); // titleId
          this.examForm.get('optionId').setValue('');

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
          })(this.examSingleQuestions, this.examMultiListQuestions);

          if (this.examQuestions.type === 'multi' && this.examQuestions.list.length === this.examQuestionsIdx + 1) {
            this.isLast = true;
          } else {
            this.isLast = false;
          }
        });
      });
    });
  }

  setOption(optionId) {
    if (this.isEnd) {
      return false;
    }
    if (this.examQuestions.type === 'multi') {

      if (this.optionIds.indexOf(optionId) !== -1) {
        const optionIds = [];
        this.optionIds.forEach(item => {
          if (item !== optionId) {
            optionIds.push(item);
          }
        });
        this.optionIds = optionIds;
      } else {
        this.optionIds.push(optionId);
      }
      this.examForm.get('optionId').setValue(this.optionIds);
    } else {
      this.examForm.get('optionId').setValue(optionId);
    }
  }

  prev() {

    if (this.questionsType === 'single') {
      if (this.examQuestionsIdx === 0) {
        return false;
      } else {
        this.router.navigate(['/admin/employee/school/exam/on', this.examId], {
          queryParams: {
            type: 'single',
            idx: this.examQuestionsIdx - 1
          }
        });
      }
    } else {
      if (this.examQuestionsIdx === 0) {
        this.router.navigate(['/admin/employee/school/exam/on', this.examId], {
          queryParams: {
            type: 'single',
            idx: this.examSingleQuestions.length - 1
          }
        });
      } else {
        this.router.navigate(['/admin/employee/school/exam/on', this.examId], {
          queryParams: {
            type: 'multi',
            idx: this.examQuestionsIdx - 1
          }
        });
      }
    }
  }

  next() {

    if (!this.isEnd) {
      this.examSvc.answer(this.examForm.value).then(res => {
        if (this.isLast) {

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
          })(this.examSingleQuestions, this.examMultiListQuestions);

          let config = {
            title: '系统提示',
            content: '是否确认交卷',
            cancel: '不交卷',
            confirm: '我要交卷'
          };
          if (this.process !== 100) {
            config = {
              title: '系统提示',
              content: '您还有题未回答，是否确认交卷',
              cancel: '不交卷',
              confirm: '我要交卷'
            };
          }

          this.dialog.show(config).subscribe(data => {
            if (data.value) {
              this.submit();
            }
          });

          return false;
        }
      });
    }

    if (this.questionsType === 'single') {
      if (this.examQuestions.list.length === this.examQuestionsIdx + 1) {
        if (this.examQuestions.list.length > 0) {
          this.router.navigate(['/admin/employee/school/exam/on', this.examId], {
            queryParams: {
              type: 'multi',
              idx: 0
            }
          });
        }
      } else {
        this.router.navigate(['/admin/employee/school/exam/on', this.examId], {
          queryParams: {
            type: 'single',
            idx: this.examQuestionsIdx + 1
          }
        });
      }
    } else {
      if (this.examQuestions.list.length > 0) {
        if (this.examQuestions.list.length === this.examQuestionsIdx + 1) {
        } else {
          this.router.navigate(['/admin/employee/school/exam/on', this.examId], {
            queryParams: {
              type: 'multi',
              idx: this.examQuestionsIdx + 1
            }
          });
        }
      }
    }
  }

  onFinished(e) {
    this.dialog.show({
      title: '系统提示',
      content: '考试时间截至，系统将自动为您交卷！',
      cancel: '',
      confirm: '我知道了'
    }).subscribe(data => {
      if (data.value) {
        this.submit();
      }
    });
  }

  getAnswers(list) {// 返回A|B|C|D
    const answers = [];
    if (list.length > 0) {
      list.forEach(item => {
        if (item.isanswers) {
          answers.push(item.serno);
        }
      });
    }
    return answers;
  }

  getSelected(list, selected) { // 返回A|B|C|D
    const answers = [];
    if (selected) {
      selected.forEach(sel => {
        list.forEach(item => {
          if (sel === item.optionid) {
            answers.push(item.serno);
          }
        });
      });
    } else {
      answers.push('未选');
    }
    return answers;
  }

  getResult(list, selected) { // 返回'正确'|'错误'
    /*const answers = this.getAnswers(list);
    selected = this.getSelected(list, selected);
    if (selected.length !== answers.length) {
      return '错误';
    } else {
      selected.forEach(sel => {
        if (answers.indexOf(sel) === -1) {
          return '错误';
        }
      });
    }
    return '正确';*/

    const answers = this.getAnswers(list);
    selected = this.getSelected(list, selected);

    let result = '正确';

    if (!selected) {
      result = '错误';
    }
    if (selected && selected.length !== answers.length) {
      result = '错误';
    } else {
      selected.forEach(sel => {
        if (answers.indexOf(sel) === -1) {
          result = '错误';
        }
      });
    }
    return result;
  }

  submit() {
    if (this.loading) {
      return false;
    }
    this.loading = true;
    this.examSvc.submit(this.examForm.value).then(res => {
      this.loading = false;
      if (res.code === 0) {
        this.router.navigate(['/admin/employee/school/exam/msg/success', this.examId], {});
      }
    });
  }

}
