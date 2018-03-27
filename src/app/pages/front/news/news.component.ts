import {Component, OnInit} from '@angular/core';

import {WxService} from '../../../modules/wx';
import {PageConfig} from './page.config';

@Component({

  selector: 'app-front-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})

export class FrontNewsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor(private wx: WxService) {
  }

  ngOnInit() {
    this.wx.config({
      title: '“大牛管家”开训了！！！',
      desc: '花城三月，春意盎然。“大牛管家第一期学员培训隆重开班，“牛群一号”正式启动！',
      link: 'http://wap.danius.cn/front/resume/job',
      imgUrl: 'http://wap.danius.cn/assets/images/front/resume/share-icon.png'
    }).then(() => {
      console.log(true);
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(err);
      // this.status = `注册失败，原因：${err}`;
    });
  }
}
