import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-trainee-verify-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminBackendTraineeVerifyItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  trainee;
  params = {
    id: ''
  };

  scores;
  courses;
  finished = false;

  turnForm: FormGroup;
  isSubmit = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.params.id = this.route.snapshot.params['id'];

    this.turnForm = new FormGroup({
      traineeId: new FormControl('', [Validators.required]),
      toApply: new FormControl('', [Validators.required]),
      /*status: new FormControl('', [Validators.required]),
      reason: new FormControl('', []),
      termid: new FormControl('', [Validators.required]),
      termname: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      studentNumber: new FormControl('', [Validators.required]),
      trcoursetypeid: new FormControl('', [Validators.required])*/
    });

    this.traineeSvc.getTrainee(this.params.id).then(res => {
      this.trainee = res.trainee;
      console.log(this.trainee);
    });

    this.traineeSvc.getTraineeCourseList(this.params.id)
      .then(res => this.courses = res.list)
      .then(courses => {
        this.traineeSvc.entryResult(this.params.id).then(res => {
          if (res.list.length === this.courses.length) {
            this.finished = true;
          }
          this.scores = {
            resultSum: res.resultSum,
            list: []
          };
          courses.forEach(course => {
            let finished = false;
            res.list.forEach(score => {
              if (course.traineecourseid === score.traineecourseid) {
                course = score;
                finished = true;
              }
            });
            course.finished = finished;
            this.scores.list.push(course);
          });
        });
      });
  }

  turn() {
    this.dialog.show({
      title: '申请管家审批',
      content: '学员姓名：' + this.trainee.name,
      cancel: '不通过',
      confirm: '通过'
    }).subscribe(data => {
      if (data.value) {
        this.traineeSvc.turnHousekeeper(this.params.id).then(res => {
          if (res.code === 0) {
            this.dialog.show({
              title: '',
              content: '成功提交申请',
              cancel: '',
              confirm: '确定'
            }).subscribe(_data => {
              if (_data.value) {
                this.router.navigate(['/admin/backend/trainee/list'], {});
              }
            });
          }
        });
      }
    });
  }

  back() {
    window.history.back();
  }
}
