import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-front-resume-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class FrontResumeJobComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor(private wx: WxService,
              private router: ActivatedRoute) {
  }


  ngOnInit() {
    this.wx.config({
      title: '“大牛管家”第四期招聘简章',
      desc: '欢迎广大有志于高端管家助理服务的退伍军人踊跃报名！',
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
