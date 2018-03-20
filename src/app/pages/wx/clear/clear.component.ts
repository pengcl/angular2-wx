import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {StorageService} from '../../../services/storage.service';
import {UserService} from '../../../services/user.service';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-wx-clear',
  templateUrl: './clear.component.html',
  styleUrls: ['./clear.component.scss']
})
export class WxClearComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user;
  userInfo;

  status: string;

  constructor(private storage: StorageService,
              private userSvc: UserService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
  }

  clear() {
    this.storage.remove('user');
    this.dialog.show({content: '删除成功'}).subscribe(res => {
      console.log(res);
    });
  }
}
