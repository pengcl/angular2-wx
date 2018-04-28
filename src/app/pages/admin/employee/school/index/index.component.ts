import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {SchoolService} from '../../../../../services/school.service';
import {StorageService} from '../../../../../services/storage.service';
import {DialogService, InfiniteLoaderComponent} from 'ngx-weui';

import {Config} from '../../../../../config';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-admin-employee-school-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AdminEmployeeSchoolIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  specialList;
  hotList;
  catalog;
  catalogList;
  newList;

  // mine
  learnList;
  markList;

  // 翻页
  pageSize: number = 10;
  currPage: number = 1;
  currLearnList;
  currMarkList;

  // tab
  tab = {
    main: 0,
    sub: 0
  };

  config = Config;

  constructor(
    private storage: StorageService,
    private wx: WxService,
    private dialog: DialogService,
    private userSvc: UserService,
    private schoolSvc: SchoolService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    if (this.storage.get('schoolTab')) {
      this.tab = JSON.parse(this.storage.get('schoolTab'));
    }

    this.schoolSvc.getHomes().then(res => {
      if (res.code === 0) {
        this.specialList = res.specialList;
        this.hotList = res.hotList;
        this.catalogList = res.catalogList;
        this.newList = res.newList;
      }
    });

    this.schoolSvc.getCatalog().then(res => {
      this.catalog = res.list;
    });

    this.schoolSvc.getLearnList(this.user.id).then(res => {
      this.learnList = res.list;
      this.currLearnList = this.learnList.slice(0, this.pageSize * this.currPage);
    });
    this.schoolSvc.getMarkList(this.user.id).then(res => {
      this.markList = res.list;
      this.currMarkList = this.markList.slice(0, this.pageSize * this.currPage);
    });
  }

  setTab(tab, e?) {
    this.tab = tab;
    this.storage.set('schoolTab', JSON.stringify(this.tab));
  }

  stopPropagation(e) {
    e.stopPropagation();
  }

  removeLearn(id, e) {
    e.stopPropagation();
    e.preventDefault();
    this.schoolSvc.removeLearn(id).then(res => {
      if (res.code === 0) {
        this.schoolSvc.getLearnList(this.user.id).then(list => {
          this.learnList = list.list;
          this.currLearnList = this.learnList.slice(0, this.pageSize * this.currPage);
        });
        this.dialog.show({content: '删除成功', cancel: '', confirm: '我知道了'}).subscribe();
      }
    });
  }

  removeMark(id, e) {
    e.stopPropagation();
    e.preventDefault();
    this.schoolSvc.removeMark(id).then(res => {
      if (res.code === 0) {
        this.schoolSvc.getMarkList(this.user.id).then(list => {
          this.markList = list.list;
          this.currMarkList = this.markList.slice(0, this.pageSize * this.currPage);
        });
        this.dialog.show({content: '删除成功', cancel: '', confirm: '我知道了'}).subscribe();
      }
    });
  }

  onLoadMarkMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currMarkList = this.markList.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currMarkList.length >= this.markList.length) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }

  onLoadLearnMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currLearnList = this.learnList.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currLearnList.length >= this.learnList.length) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }

}
