import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {Config} from '../../../config';
import {WxService} from '../../../modules/wx';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-wx-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class WxIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user;

  status: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private wx: WxService) {
  }

  ngOnInit() {

    this.wx.config({
      title: '大牛管家诚聘优才-index',
      desc: 'index-欢迎广大有志于高端管家助理服务的退伍军人，体育专业毕业生踊跃报名！',
      link: Config.webHost + '/front/resume/job',
      imgUrl: Config.webHost + '/assets/images/front/resume/share-icon.png'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
      this.status = '注册成功';
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
      this.status = `注册失败，原因：${err}`;
    });
  }
}
