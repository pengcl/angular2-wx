import {Component, OnInit, ViewChild} from '@angular/core';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../../services/user.service';
import {SchoolService} from '../../../../../../../services/school.service';

import {Config} from '../../../../../../../config';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DialogService} from 'ngx-weui';
import {MoService} from '../../../../../../../services/mo.service';
import {getIndex, getPrevOfArray, getNextOfArray} from '../../../../../../../utils/utils';

import {simAnim} from '../../../../../../../utils/animate';

declare var mojs: any;
declare var $: any;

const OPTS = {
  fill: 'none',
  radius: 25,
  strokeWidth: {50: 0},
  scale: {0: 1},
  duration: 500,
  left: 0, top: 0,
  easing: 'cubic.out'
};

@Component({
  selector: 'app-admin-employee-school-curriculum-course-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [simAnim]
})
export class AdminEmployeeSchoolCurriculumCourseItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  config = Config;
  courseId;
  course;
  courseCatalog;

  courseForm: FormGroup;

  loading = false;
  prev;
  next;

  @ViewChild('scrollable') private container: any;
  scrollTop = 0;
  scrollStatus:String = 'default';

  animationName = 'stretch';

  mainCircle: any;
  smallCircles: any[] = [];
  timeline: any;
  timer;
  favorId;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private dialog: DialogService,
              private userSvc: UserService,
              private schoolSvc: SchoolService,
              private mo: MoService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.courseForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      courseId: new FormControl('', [Validators.required]),
      catalogId: new FormControl('', [Validators.required])
    });

    this.activatedRoute.paramMap.switchMap((params: ParamMap) => this.schoolSvc.getCourseItem(params.get('id'), this.user.id)).subscribe(res => {
      this.course = res.course;
      this.favorId = res.course.favoriteId;
      this.courseForm.get('custId').setValue(this.user.id);
      this.courseForm.get('courseId').setValue(this.course.courseid);
      this.courseForm.get('catalogId').setValue(this.course.coursecatalogid);

      this.schoolSvc.setLearned(this.courseForm.value).then(res);

      this.schoolSvc.getCourseCatalog(this.course.coursecatalogid, this.user.id).then(data => {
        if (res.code === 0) {
          this.courseCatalog = data.list;
          const currIndex = getIndex(this.courseCatalog, 'serno', this.course.serno);
          const _prev = getPrevOfArray(this.courseCatalog, currIndex);
          const _next = getNextOfArray(this.courseCatalog, currIndex);
          this.prev = _prev ? this.courseCatalog[_prev].courseid : '';
          this.next = _next ? this.courseCatalog[_next].courseid : '';
        }
      });
    });

    this.mo.get().then(res => res).then((res) => {
      const colors = ['deeppink', 'magenta', 'yellow', '#00F87F'];
      this.mainCircle = new mojs.Shape({
        ...OPTS,
        stroke: 'cyan'
      });

      for (let i = 0; i < 4; i++) {
        this.smallCircles.push(new mojs.Shape({
            ...OPTS,
            parent: this.mainCircle.el,
            strokeWidth: {30: 0},
            left: '50%', top: '50%',
            stroke: colors[i % colors.length],
            delay: 'rand(0, 350)',
            x: 'rand(-50, 50)',
            y: 'rand(-50, 50)',
            radius: 'rand(5, 10)'
          })
        );
      }

      const $moEle = $('[data-name="mojs-shape"]');
      this.timeline = new mojs.Timeline({
        onStart() {
          $moEle.removeClass('hide');
          $moEle.addClass('show');
        },
        onComplete() {
          $moEle.removeClass('show');
          $moEle.addClass('hide');
        }
      });
    });
  }

  onPrev() {
    if (!this.prev) {
      this.dialog.show({content: '没有上一节', cancel: '', confirm: '我知道了'}).subscribe();
      return false;
    }
    this.router.navigate(['/admin/employee/school/curriculum/course/item', this.prev], {});
  }

  onNext() {
    if (!this.next) {
      this.dialog.show({content: '没有下一节', cancel: '', confirm: '我知道了'}).subscribe();
      return false;
    }
    this.router.navigate(['/admin/employee/school/curriculum/course/item', this.next], {});
  }

  setMarked(e) {
    this.schoolSvc.setMarked(this.courseForm.value).then(res => {
      if (res.code === 0) {
        this.favorId = res.facorite.favoriteid;
        this.like(e);
      }
    });
  }

  removeMark(e) {
    this.schoolSvc.removeMark(this.favorId).then(res => {
      if (res.code === 0) {
        this.favorId = '';
        this.like(e);
      }
    });
  }

  onScroll() {
    const distanceTop = this.container.nativeElement.scrollTop;
    if (distanceTop - this.scrollTop > 0) {
      this.scrollStatus = 'up';
      this.animationName = 'shrink';
    } else {
      this.scrollStatus = 'down';
      this.animationName = 'stretch';
    }
    this.scrollTop = distanceTop;
  }

  like(e) {
    this.mainCircle
      .tune({x: e.pageX, y: e.pageY});

    for (let i = 0; i < this.smallCircles.length; i++) {
      this.smallCircles[i]
        .generate();
    }

    this.timeline.add(this.mainCircle, this.smallCircles);
    this.timeline.replay();
    this.timer = setTimeout(() => {
      this.timeline.reset(500);
    }, 1000);
  }


  onSubmit() {
  }

}
