import {Component, OnInit, OnDestroy} from '@angular/core';
import {PageConfig} from './page.config';
import {Config} from '../../../../config';

import {ActivatedRoute} from '@angular/router';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-recruitment-msg-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.scss']
})
export class RecruitmentMsgFriendComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user;
  friend;

  constructor(private activatedRoute: ActivatedRoute,
              private userSvc: UserService,
              private wx: WxService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.friend = this.activatedRoute.snapshot.queryParams['friend'];
  }

  onShare(state) {
    this.wx.config({
      title: '帮您开通大牛管家招聘账号',
      desc: '您可以开始进行人才招聘，成功后会获得丰厚的补贴哦！',
      link: Config.webHost + '/recruitment/msg/friend/get',
      imgUrl: Config.webHost + '/assets/images/front/resume/share-icon.png'
    }).then(() => {
      console.log(true);
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(err);
      // this.status = `注册失败，原因：${err}`;
    });
    this.wx.show(state).subscribe(res => {
      console.log(res);
    });
  }

  ngOnDestroy() {
    console.log('ngOnDestroy');
    this.wx.destroyAll();
  }
}
