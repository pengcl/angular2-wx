import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';
import {OrderService} from '../../../services/order.service';
import {LogService} from '../../../services/log.service';
import {Config} from '../../../config';

@Component({
  selector: 'app-guide-step2',
  templateUrl: './step-2.component.html',
  styleUrls: ['./step-2.component.scss']
})
export class GuideStep2Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  orderNo;
  order;

  loading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private wx: WxService,
              private logSvc: LogService,
              private orderSvc: OrderService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
    this.logSvc.pageLoad('C');
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
    this.orderSvc.getIntentServiceOrder(this.orderNo).then(res => {
      this.order = res;
      console.log(res);
    });
  }

  pay() {
    if (this.loading) {
      return false;
    }

    this.loading = true;

    window.location.href = this.order.payUrl + '&successUrl=' + encodeURIComponent(Config.webHost + '/guide/step3?orderNo=' + this.orderNo);
  }
}
