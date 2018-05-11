import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {TraineeService} from '../../../../../services/backend/trainee.service';
import {DialogService} from 'ngx-weui';
import {getIndex} from '../../../../../utils/utils';

@Component({
  selector: 'app-admin-backend-trainee-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.scss']
})
export class AdminBackendTraineeScoreComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  params = {
    type: 2,
    id: ''
  };

  courses;
  scores;
  finished;

  courseForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.params.id = this.route.snapshot.params['id'];
    this.traineeSvc.getTrainee(this.params.id).then(res => {
    });

    this.traineeSvc.getTraineeCourseList(this.params.id)
      .then(res => this.courses = res.list)
      .then(courses => {
        this.traineeSvc.entryResult(this.params.id).then(res => {
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
          this.courseForm = this.toFormGroup(this.scores.list);
          this.scores.list.forEach(item => {
            if (item.finished) {
              this.courseForm.get('form_' + item.traineecourseid).setValue(item.examresults);
            }
          });
        });
      });
  }

  toFormGroup(items) {
    const group: any = {};

    items.forEach(item => {
      group['form_' + item.traineecourseid] = item.required ? new FormControl(item.value || '')
        : new FormControl(item.value || '');
    });
    return new FormGroup(group);
  }

  onSubmit() {
    const body = {
      ids: [],
      values: []
    };
    for (const item in this.courseForm.value) {
      if (this.courseForm.value[item] || this.courseForm.value[item] === 0) {
        body.ids.push(parseInt(item.replace('form_', ''), 10));
        body.values.push(this.courseForm.value[item]);
      }
    }
    this.traineeSvc.saveEntryResult(body).then(res => {
      if (res.code === 0) {
        this.router.navigate(['/admin/backend/trainee/item', this.params.id], {});
      }
    });
  }
}
