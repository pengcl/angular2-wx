import {Component, OnDestroy, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ActionSheetConfig} from './actionsheet.config';
import {Observer} from 'rxjs/Observer';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-actionsheet',
  templateUrl: './actionsheet.component.html',
  styleUrls: ['./actionsheet.component.scss'],
  animations: [trigger('visibility', [
    state('show', style({opacity: 1})),
    state('hide', style({opacity: 0})),
    transition('hide <=> show', [animate(200)])
  ])],
  providers: [ActionSheetConfig],
  host: {
    '[hidden]': '!_shown'
  }
})
export class ActionSheetComponent implements OnDestroy {

  /**
   * 配置项
   *
   * @type {ActionSheetConfig}
   */
  @Input() config: ActionSheetConfig;

  /**
   * 菜单内容
   *
   * @type {Array}
   */
  @Input() menus: { text?: string, [key: string]: any }[];

  /**
   * 关闭回调
   */
  @Output() close = new EventEmitter();

  _shown: boolean = false;
  /**
   * 动画状态码
   */
  _shownAnt = false;

  private observer: Observer<any>;

  get _visibility(): string {
    return this._shownAnt ? 'show' : 'hide';
  }

  constructor(private DEF: ActionSheetConfig) {
  }

  /**
   * 显示，组件载入页面后并不会显示，显示调用 `show()` 并订阅结果。
   *
   * @returns {Observable<any>}
   */
  show(): Observable<any> {
    this.config = Object.assign({
      backdrop: true,
    }, this.DEF, this.config);
    this._shown = true;
    setTimeout(() => {
      this._shownAnt = true;
    }, 10);
    return Observable.create((observer: Observer<any>) => {
      this.observer = observer;
    });
  }

  /**
   * 隐藏
   *
   * @param {boolean} [is_backdrop] 是否从背景上点击
   */
  hide(is_backdrop?: boolean) {
    if (is_backdrop === true && this.config.backdrop === false) {
      return false;
    }

    this._shownAnt = false;
    setTimeout(() => {
      this._shown = false;
      this.close.emit();
    }, 300);
  }

  /**
   * 选择动作
   */
  _onSelect(menu: { text?: string, [key: string]: any }) {
    this.observer.next(menu);
    this.observer.complete();
    this.hide();
  }

  ngOnDestroy(): void {
    if (this.observer && this.observer instanceof Subscription) {
      (<Subscription>this.observer).unsubscribe();
    }
  }

}
