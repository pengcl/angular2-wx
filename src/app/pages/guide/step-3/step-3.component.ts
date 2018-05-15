import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from '../../page.config';

import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'app-guide-step3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.scss']
})
export class GuideStep3Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  /*orderNo;
  ready = false;*/

  constructor(private route: ActivatedRoute,
              private orderSvc: OrderService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    /*this.orderNo = this.route.snapshot.queryParams['orderNo'];
    this.orderSvc.getIntentServiceOrder(this.orderNo).then(res => {
      const dateTime = Date.parse(res.insideDate.replace(/-/gi, '/') + ' 00:00:00');
      this.ready = Date.parse((new Date()).toString()) >= dateTime;
    });*/
  }

}
