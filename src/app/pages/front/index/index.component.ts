import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';
import {ToastService} from '../../../services/toast.service';
import {DialogService} from '../../../services/dialog.service';
import {WXService} from '../../../services/wx.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import {InfiniteLoaderComponent} from '../../../components/infinite-loader/infinite-loader.component';
import {Dialog} from '../../../models/dialog.model';

@Component({
  selector: 'app-front-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class FrontIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  jsApiList: string[] = ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'onMenuShareQZone'];
  status: string;

  restartBtn = false;

  items: any[] = Array(20).fill(0).map((v: any, i: number) => i);

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private dialog: DialogService, private toast: ToastService, private wxService: WXService) {
  }


  ngOnInit() {
    this.wxService.config({
      title: '新标题'
    }, this.jsApiList).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      this.status = '注册成功';
    }).catch((err: string) => {
      this.status = `注册失败，原因：${err}`;
    });
  }

  onShowToast(type: 'success' | 'loading', time?: number) {
    this.toast.show(type, time);
  }

  onShowBySrv() {
    this.dialog.show({
      title: '系统提示',
      content: 'haha',
    }).subscribe((res: any) => {
      console.log(res);
    });
    return false;
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    this.restartBtn = false;
    Observable.timer(1500).subscribe(() => {

      this.items.push(...Array(10).fill(this.items.length).map((v, i) => v + i));

      if (this.items.length >= 50) {
        this.restartBtn = true;
        comp.setFinished();
        return;
      }
      comp.resolveLoading();
    });
  }

  restart() {
    this.items.length = 0;
    this.il.restart();
  }

}
