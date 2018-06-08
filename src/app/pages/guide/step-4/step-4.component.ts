import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';

import {EmployeeService} from '../../../services/employee.service';
import {Observable} from 'rxjs/Observable';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {Config} from '../../../config';

@Component({
  selector: 'app-guide-step4',
  templateUrl: './step-4.component.html',
  styleUrls: ['./step-4.component.scss']
})
export class GuideStep4Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  lists;

  params = {
    serviceAreaId: '',
    levelId: '',
    synthetical: '',
    page: 1
  };

  /*inConfig: InfiniteLoaderConfig = {
    finished: `<div class="weui-btn-area"><a weui-button [weui-loading]="loading" class="weui-btn weui-btn_primary">支付订金￥300</a></div>`
  };*/

  orderNo;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private wx: WxService,
              private employeeSvc: EmployeeService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.wx.config({
      title: '大牛管家, 只为牛人服务',
      desc: '我们禀承“忠诚、安全、健康、舒心”的服务理念，旨在为全国高端商务人士及其家庭提供“安全防护、驾驶出行、科学运动”三大类日常综合管家服务。',
      link: Config.webHost + '/guide/start',
      imgUrl: Config.webHost + '/assets/images/guide/share.jpg'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });

    this.orderNo = this.route.snapshot.queryParams['orderNo'];

    this.employeeSvc.getIntentList(this.params).then(res => {
      this.lists = res.list;
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(1500).subscribe(() => {

      this.params.page = this.params.page + 1;
      this.employeeSvc.getIntentList(this.params).then(res => {
        this.lists = this.lists.concat(res.list);
        console.log(res.page, res.totalPage);
        if (res.page >= res.totalPage) {
          console.log('finished');
          comp.setFinished();
          return;
        }
      });

      comp.resolveLoading();
    });
  }
}
