import {Component, OnInit, ViewEncapsulation, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';
import {ToastService} from '../../../services/toast.service';
import {DialogService} from '../../../modules/dialog';
import {WXService} from '../../../services/wx.service';
import {ProductsService} from '../../../services/products.service';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import {InfiniteLoaderComponent} from '../../../components/infinite-loader/infinite-loader.component';

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

  pageSize: number = 12;
  currPage: number = 1;
  totalPage: number = 1;
  currLists: any[];
  lists: any[];

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private dialog: DialogService, private toast: ToastService, private wxService: WXService, private productSvc: ProductsService) {
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

    this.productSvc.getProducts().then(products => {
      this.lists = products;
      this.currLists = products.slice(0, this.pageSize);
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
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currLists = this.lists.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currLists.length >= this.lists.length) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }

}
