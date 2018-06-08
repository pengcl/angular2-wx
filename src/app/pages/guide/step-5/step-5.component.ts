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
import {RatingConfig, DialogService} from 'ngx-weui';
import {FormControl, FormGroup, Validators} from '@angular/forms';

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
  housekeeperId;

  rate = 0;
  score = {
    scores: [],
    count: 0
  };

  orderNo;
  order;
  orderId;

  contentForm: FormGroup;

  isSubmit = false;
  loading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialogSvc: DialogService,
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
    this.housekeeperId = this.route.snapshot.params['id'];

    this.orderSvc.getIntentServiceOrder(this.orderNo).then(res => {
      this.order = res.intentServiceOrder;
    });

    this.contentForm = new FormGroup({
      intentServiceOrderId: new FormControl('', [Validators.required]),
      housekeeperId: new FormControl('', [Validators.required])
    });

    this.contentForm.get('housekeeperId').setValue(this.housekeeperId);

    this.orderSvc.getIntentServiceOrder(this.orderNo)
      .then(res => this.orderId = res.intentServiceOrder.serviceorderid)
      .then(orderId => {
        this.contentForm.get('intentServiceOrderId').setValue(orderId);
      });

    this.route.paramMap.switchMap((params: ParamMap) => this.employeeSvc.getHousekeeper(params.get('id'))).subscribe(res => {
      this.housekeeper = res.housekeeper;
      const images = [];

      this.housekeeper.imageList.forEach(item => {
        if (item.isapproval === 1) {
          images.push(item.imageurl);
        }
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

  reserve() {
    console.log(this.contentForm.value);
    this.isSubmit = true;
    if (this.loading || this.contentForm.invalid) {
      return false;
    }
    this.loading = true;
    this.orderSvc.relHousekeeperForIntent(this.contentForm.value).then(res => {
      this.loading = false;
      if (res.code === 0) {
        this.router.navigate(['/guide/step7']);
      } else {
        this.dialogSvc.show({content: res.msg, cancel: '', confirm: '我知道了！'}).subscribe();
      }
      console.log(res);
    });
  }
}
