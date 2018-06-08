import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {DialogService} from 'ngx-weui';
import {HousekeeperService} from '../../../../../services/backend/housekeeper.service';
import {TraineeService} from '../../../../../services/backend/trainee.service';

@Component({
  selector: 'app-admin-backend-housekeeper-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminBackendHousekeeperItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  housekeeper;
  trainee;

  courses;
  finished = false;
  scores;
  cont;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private housekeeperSvc: HousekeeperService,
              private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.housekeeperSvc.getDetail(this.route.snapshot.params['id']).then(res => {
      this.cont = res.cont;
      this.housekeeper = res.housekeeper;
      console.log(res);
      return this.housekeeper;
    }).then(housekeeper => {
      this.traineeSvc.getTrainee(housekeeper.traineeid).then(res => {
        this.trainee = res.trainee;
        console.log(this.trainee);
      });
      this.traineeSvc.getTraineeCourseList(housekeeper.traineeid)
        .then(res => this.courses = res.list)
        .then(courses => {
          this.traineeSvc.entryResult(housekeeper.traineeid).then(res => {
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
    });
  }

  back() {
    window.history.back();
  }
}
