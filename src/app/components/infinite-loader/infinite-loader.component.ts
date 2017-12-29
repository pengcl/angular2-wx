import {
  Component,
  ViewEncapsulation,
  Input,
  OnChanges,
  SimpleChanges,
  EventEmitter,
  Output,
  HostListener,
  ElementRef,
  OnDestroy,
  NgZone,
  OnInit
} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/throttleTime';

import {InfiniteLoaderConfig} from './infinite-loader.config';

@Component({
  selector: 'app-infinite-loader',
  template: `
    <div class="weui-infiniteloader__content">
      <ng-content></ng-content>
      <div *ngIf="_loading || _finished">
        <div *ngIf="_loading" [innerHTML]="config.loading"></div>
        <div *ngIf="_finished" [innerHTML]="config.finished"></div>
      </div>
    </div>
  `,
  styleUrls: ['./infinite-loader.component.scss'],
  host: {
    '[class.weui-infiniteloader]': 'true',
    '[style.height]': 'config.height'
  },
  encapsulation: ViewEncapsulation.None
})
export class InfiniteLoaderComponent implements OnChanges, OnInit, OnDestroy {
  private didScroll = false;
  private scrollEvent: any = null;
  private scrollTime: any = null;
  private disposeScroller: Subscription;

  _loading: boolean = false;
  _finished: boolean = false;

  /**
   * 配置项
   *
   * @type {InfiniteLoaderConfig}
   */
  @Input() config: InfiniteLoaderConfig;
  /*@HostListener('class.weui-infiniteloader') 'class.weui-infiniteloader': true;
  @HostListener('style.height') 'style.height': 'config.height';*/
  /**
   * 加载更多回调
   */
  @Output() loadmore = new EventEmitter();

  constructor(private el: ElementRef,
              private zone: NgZone,
              private DEF: InfiniteLoaderConfig) {
  }

  /** 设置本次加载完成 */
  resolveLoading() {
    this._loading = false;
    this._finished = false;
  }

  /** 设置结束 */
  setFinished() {
    this._loading = false;
    this._finished = true;
  }

  /** 设置重新开始 */
  restart() {
    this._finished = false;
  }

  _onScroll() {
    if (this._loading || this._finished) {
      return;
    }
    const target = this.scrollEvent.target;
    const scrollPercent = Math.floor(((target.scrollTop + target.clientHeight) / target.scrollHeight) * 100);

    if (scrollPercent > this.config.percent) {
      this._loading = true;
      this.loadmore.emit(this);
    }
  }

  ngOnInit() {
    this.parseConfig();
    this.scrollTime = setInterval(() => {
      if (this.didScroll) {
        this.didScroll = false;
        this._onScroll();
      }
    }, this.config.throttle);

    Observable
      .fromEvent(this.el.nativeElement.querySelector('.weui-infiniteloader__content'), 'scroll')
      .subscribe(($event: any) => {
        this.scrollEvent = $event;
        this.didScroll = true;
      });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('config' in changes) {
      this.parseConfig();
    }
  }

  ngOnDestroy(): void {
    if (this.scrollTime) {
      clearTimeout(this.scrollTime);
    }
    if (this.disposeScroller) {
      this.disposeScroller.unsubscribe();
    }
  }

  private parseConfig() {
    this.config = Object.assign({}, this.DEF, this.config);
  }
}
