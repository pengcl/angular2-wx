import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';
import {Config} from '../../config';
import {MoService} from '../../services/mo.service';
import {getDateDifference} from '../../utils/utils';

declare var $: any;
declare var mojs: any;

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
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnChanges {
  @Input() profile;
  @Input() listType;
  @Input() moJsReady;
  @Input() last;
  config: any = Config;

  mainCircle: any;
  smallCircles: any[] = [];
  timeline: any;
  timer;

  avatar;
  // dateDifference;

  constructor(private moSvc: MoService) {
  }

  ngOnInit() {
    console.log(this.profile);
    // this.dateDifference = Math.ceil(getDateDifference(new Date(), this.profile.createtime) / 30);
    this.avatar = this.profile.headimageurl ? this.config.prefix.wApi + this.profile.headimageurl : '/assets/images/avatar.jpg';
  }

  // http://wap.danius.cn/wApi/housekeeperImage/2872dda2-da0c-461e-aba9-3670ecc0e2a1/headImage//1804041726496940.jpg;
  // http://wap.danius.cn/wApi/housekeeperImage/b3944c84-d9b0-4486-b3e2-a1c7433a3b5f/headImage//1804031431099278.jpg

  ngOnChanges(changes: SimpleChanges) {
    if ('moJsReady' in changes && changes.moJsReady.currentValue) {
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
    }
  }

  like(e) {
    e.stopPropagation();
    if (!this.profile.like) {
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
    this.profile.like = !this.profile.like;
  }

}
