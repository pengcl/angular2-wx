import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../services/user.service';
import {ExamService} from '../../../../../../services/exam.service ';

import {Config} from '../../../../../../config';

function getAnswers(list) {// 返回A|B|C|D
  const answers = [];
  list.forEach(item => {
    if (item.isanswers) {
      answers.push(item.serno);
    }
  });
  return answers;
}

function getSelected(list, selected) { // 返回A|B|C|D
  const answers = [];
  if (selected && selected.length > 0) {
    selected.forEach(sel => {
      list.forEach(item => {
        if (sel === item.optionid) {
          answers.push(item.serno);
        }
      });
    });
  }
  return answers;
}

@Component({
  selector: 'app-admin-employee-school-exam-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class AdminEmployeeSchoolExamResultComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  @ViewChild('canvas') private canvas: any;

  config = Config;

  user;

  leftTime;
  process = 0;
  examId;
  examInfo;
  examResults;
  examSingleQuestions;
  examMultiListQuestions;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userSvc: UserService,
              private examSvc: ExamService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.examId = this.activatedRoute.snapshot.params['id']; // examId

    this.examSvc.getExamInfo(this.examId, this.user.id).then(info => {
      this.activatedRoute.queryParamMap.subscribe((params: ParamMap) => {
        this.examSvc.getExamInfo(this.examId, this.user.id, info.signUp.signupid).then(res => {
          this.examInfo = res.exam;
          this.examResults = res.signUp.examresults;
          console.log(res);
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

          const $ctx = this.canvas.nativeElement;
          const ctx = $ctx.getContext('2d');
          ctx.translate(50, 50);
          ctx.beginPath();
          ctx.strokeStyle = '#f5f5f5';
          ctx.save();
          ctx.arc(0, 0, 49, 0, Math.PI * 2);
          ctx.closePath();
          ctx.stroke();

          ctx.restore();
          ctx.beginPath();
          ctx.strokeStyle = '#CA9F4D';
          ctx.lineWidth = 4;
          ctx.lineCap = 'round';
          ctx.arc(0, 0, 46, -Math.PI * 0.5, Math.PI * (this.examResults / 100 * 2 - 0.5), false);
          ctx.stroke();

        });
      });
    });
  }

  getResults(list, selected) { // 返回'正确'|'错误'
    const answers = getAnswers(list);
    selected = getSelected(list, selected);

    let result = true;

    if (!selected) {
      result = false;
    }
    if (selected && selected.length !== answers.length) {
      result = false;
    } else {
      selected.forEach(sel => {
        if (answers.indexOf(sel) === -1) {
          result = false;
        }
      });
    }
    return result;
  }

  back() {
    window.history.back();
  }

  submit() {
    this.router.navigate(['/admin/employee/school/exam/on', this.examId], {queryParams: {type: 'single', idx: 0}});
  }

}
