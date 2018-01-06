import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WXService} from '../../../services/wx.service';
import {UserService} from '../../../services/user.service';
import {MoService} from '../../../services/mo.service';
import {timeout} from 'rxjs/operator/timeout';

declare var $: any;
declare var mojs: any;

interface Butler {
  userId: string;
  name: string;
  age: number;
  sex: number;
  experience: number;
  skill: string[];
  avatar: string;
  post: string;
  price: number;
  origin: string;
  like?: boolean;
}

const OPTS = {
  fill: 'none',
  radius: 25,
  strokeWidth: {50: 0},
  scale: {0: 1},
  duration: 500,
  left: 0, top: 0,
  easing: 'cubic.out'
};

const $filterContent = $('.filter-content');

@Component({
  selector: 'app-admin-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.scss']
})
export class AdminListsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;
  timer: any;

  butlers: Butler[] = [
    {
      userId: '001',
      name: '黑寡妇',
      age: 40,
      sex: 0,
      experience: 10,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/1.jpg',
      price: 10000,
      origin: '美国',
      like: false
    },
    {
      userId: '002',
      name: '钢铁侠',
      age: 40,
      sex: 1,
      experience: 10,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/2.jpg',
      price: 10000,
      origin: '美国',
      like: false
    },
    {
      userId: '003',
      name: '美国队长',
      age: 40,
      sex: 1,
      experience: 10,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/3.jpg',
      price: 10000,
      origin: '美国',
      like: false
    },
    {
      userId: '004',
      name: '绿巨人',
      age: 40,
      sex: 1,
      experience: 10,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/4.jpg',
      price: 10000,
      origin: '美国',
      like: false
    },
    {
      userId: '005',
      name: '雷神',
      age: 40,
      sex: 1,
      experience: 10,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/5.jpg',
      price: 10000,
      origin: '美国',
      like: false
    },
    {
      userId: '006',
      name: '鹰眼',
      age: 40,
      sex: 1,
      experience: 10,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/6.jpg',
      price: 10000,
      origin: '美国',
      like: false
    },
    {
      userId: '007',
      name: '红女巫',
      age: 40,
      sex: 0,
      experience: 10,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/7.jpg',
      price: 10000,
      origin: '美国',
      like: false
    },
    {
      userId: '008',
      name: '快银',
      age: 40,
      sex: 1,
      experience: 10,
      skill: [],
      avatar: '',
      post: '/assets/images/butlers/8.jpg',
      price: 10000,
      origin: '美国',
      like: false
    },
  ];

  mainCircle: any;
  smallCircles: any[] = [];
  timeline: any;

  filterShow: boolean = true;

  constructor(private wx: WXService, private userSvc: UserService, private moSvc: MoService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }

    this.moSvc.get().then((res) => {

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

      this.timeline = new mojs.Timeline({
        onStart() {
          const $moEle = $('body > div:last');
          $moEle.removeClass('hide');
          $moEle.addClass('show');
        },
        onComplete() {
          const $moEle = $('body > div:last');
          $moEle.removeClass('show');
          $moEle.addClass('hide');
          console.log();
        }
      });
    });

  }

  showFilter(show: boolean) {
    this.filterShow = show;
  }

  selectedButler(butler) {
    console.log(butler);
  }

  like(e, index) {
    e.stopPropagation();
    if (!this.butlers[index].like) {
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
    this.butlers[index].like = !this.butlers[index].like;
  }

}
