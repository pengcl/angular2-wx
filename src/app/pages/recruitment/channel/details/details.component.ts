import {Component, OnInit, OnDestroy} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../services/user.service';
import {PageConfig} from './page.config';

import {RecruitService} from '../../../../services/recruit.service';
import {WxService} from '../../../../modules/wx';

@Component({
  selector: 'app-recruitment-channel-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class RecruitmentChannelDetailsComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  channel = {};
  allItems;
  housekeepers;
  trainees;

  constructor(private activatedRoute: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private recruit: RecruitService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.recruit.getChannel(this.user.id, this.activatedRoute.snapshot.queryParams['gh']).then(res => {
      console.log(res);
      if (res.code === 0) {
        this.channel = res;
        this.allItems = res.list;
        this.housekeepers = res.list.filter((item) => {
          return item.progresstype === 3;
        });
        this.trainees = res.list.filter((item) => {
          return item.progresstype === 2;
        });
      }
    });
  }

  onShare() {
    this.wx.config({
      title: '大牛管家诚聘优才',
      desc: '欢迎广大有志于高端管家助理服务的退伍军人，体育专业毕业生踊跃报名！',
      link: 'http://wap.danius.cn/front/resume/job?gh=' + this.activatedRoute.snapshot.queryParams['gh'] + '&referee=' + this.user.id,
      imgUrl: 'http://wap.danius.cn/assets/images/front/resume/share-icon.png'
    }).then(() => {
      console.log(true);
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(err);
      // this.status = `注册失败，原因：${err}`;
    });
    this.wx.show({targetTips: '继续邀请学员吧！'}).subscribe(res => {
      console.log(res);
    });
    return false;
  }

  ngOnDestroy() {
    this.wx.destroyAll();
  }
}
