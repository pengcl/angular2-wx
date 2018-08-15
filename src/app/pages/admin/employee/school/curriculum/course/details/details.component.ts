
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../../services/user.service';
import {SchoolService} from '../../../../../../../services/school.service';

import {Config} from '../../../../../../../config';
import {ActivatedRoute} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogService, InfiniteLoaderComponent} from 'ngx-weui';

@Component({
  selector: 'app-admin-employee-school-curriculum-course-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AdminEmployeeSchoolCurriculumCourseDetailsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  config = Config;
  courseId;
  course;
  courseCatalog;
  comments;

  active = 0;

  joinForm: FormGroup;
  commentForm: FormGroup;

  // 翻页
  pageSize: number = 10;
  currPage: number = 1;
  currComments: any[];

  loading = false;

  constructor(private activatedRoute: ActivatedRoute,
              private dialog: DialogService,
              private userSvc: UserService,
              private schoolSvc: SchoolService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.courseId = this.activatedRoute.snapshot.params['id'];

    this.joinForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      catalogId: new FormControl('', [Validators.required])
    });

    this.commentForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      catalogId: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required])
    });

    this.joinForm.get('custId').setValue(this.user.id);
    this.joinForm.get('catalogId').setValue(this.courseId);

    this.commentForm.get('custId').setValue(this.user.id);
    this.commentForm.get('catalogId').setValue(this.courseId);

    this.schoolSvc.getCourse(this.courseId, this.user.id).then(res => {
      if (res.code === 0) {
        this.course = res;
      }
    });

    this.schoolSvc.getCourseCatalog(this.courseId, this.user.id).then(res => {
      if (res.code === 0) {
        const courseCatalog = [];
        let i = 0;
        res.list.forEach((item, index) => {
          if (i === 0 && item.islearn === 0) {
            i = 1;
            item.islearn = 2;
          }
          courseCatalog.push(item);
        });
        this.courseCatalog = courseCatalog;
      }
    });

    this.schoolSvc.getComments(this.courseId).then(res => {
      if (res.code === 0) {
        this.comments = res.list;
        this.currComments = this.comments.slice(0, this.pageSize * this.currPage);
      }
    });
  }

  joinCourse() {
    this.schoolSvc.joinCourse(this.joinForm.value).then(res => {
      this.dialog.show({
        content: '你已成功加入学习！',
        cancel: '',
        confirm: '我知道了'
      }).subscribe(data => {
      });
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currComments = this.comments.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currComments.length >= this.comments.length) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }

  onSubmit() {
    this.loading = true;
    if (this.commentForm.invalid) {
      this.loading = false;
      return false;
    }

    this.schoolSvc.postComment(this.commentForm.value).then(res => {
      this.loading = false;
      if (res.code === 0) {
        this.commentForm.get('content').setValue('');
        this.dialog.show({
          content: '你已成功发表评论！',
          cancel: '',
          confirm: '我知道了'
        }).subscribe(data => {
          this.schoolSvc.getComments(this.courseId).then(comments => {
            if (comments.code === 0) {
              this.comments = comments.list;
              this.currComments = this.comments.slice(0, this.pageSize * this.currPage);
            }
          });
        });
      }
    });
  }

}
