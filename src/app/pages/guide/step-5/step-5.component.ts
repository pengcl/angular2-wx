import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {EmployeeService} from '../../../services/employee.service';
import {OrderService} from '../../../services/order.service';
import {Config} from '../../../config';

import {getRate} from '../../../utils/utils';
import {RatingConfig} from 'ngx-weui';

@Component({
  selector: 'app-guide-step5',
  templateUrl: './step-5.component.html',
  styleUrls: ['./step-5.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuideStep5Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  gh = '';

  config = Config;

  show: boolean = false;

  images;
  imagesLen = 4;
  galleryCurrent = 0;

  housekeeper: any;

  rate = 0;
  score = {
    scores: [],
    count: 0
  };

  orderNo;
  order;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService,
              private orderSvc: OrderService) {
  }

  showGallery(current) {
    this.show = true;
    this.galleryCurrent = current;
  }

  ngOnInit() {
    this.gh = this.route.snapshot.queryParams['gh'];
    this.orderNo = this.route.snapshot.queryParams['orderNo'];
    this.orderSvc.getIntentServiceOrder(this.orderNo).then(res => {
      this.order = res.intentServiceOrder;
      console.log(res.intentServiceOrder.serviceorderid);
    });
    this.route.paramMap.switchMap((params: ParamMap) => this.employeeSvc.getHousekeeper(params.get('id'))).subscribe(res => {
      this.housekeeper = res.housekeeper;
      const images = [];

      this.housekeeper.imageList.forEach(item => {
        images.push(item.imageurl);
      });

      this.images = images;

      this.employeeSvc.getEmployeeScores(this.housekeeper.housekeeperid).then(scores => {
        this.score.count = 0;

        scores.forEach(k => {
          const item = {
            name: this.housekeeper.name,
            props: k.props,
            value: k.value / k.credit * 100,
            rate: getRate(k.value / k.credit * 100)
          };
          this.score.scores.push(item);
          this.score.count = this.score.count + item.value;
        });

        if (this.score.count === 0) {
          return false;
        }

        this.rate = getRate(this.score.count / scores.length);
      });
    });
  }

  showMore() {
    if (this.imagesLen === 100) {
      this.imagesLen = 4;
    } else {
      this.imagesLen = 100;
    }
  }
}
