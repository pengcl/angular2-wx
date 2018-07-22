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
  selector: 'app-guide-w-n-step5',
  templateUrl: './step-5.component.html',
  styleUrls: ['./step-5.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuideWNStep5Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  avatar;
  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  gh = '';

  config = Config;

  show: boolean = false;

  images;
  imagesLen = 3;
  galleryCurrent = 0;

  housekeeper: any;
  housekeeperId;

  rate = 0;
  score = {
    scores: [],
    count: 0
  };

  contentForm: FormGroup;

  isSubmit = false;
  loading = false;

  orderNo;
  isPaid: boolean = false;
  payUrl;

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
    this.housekeeperId = this.route.snapshot.params['id'];
    this.orderNo = this.route.snapshot.queryParams['orderNo'];

    this.contentForm = new FormGroup({
      intentServiceOrderId: new FormControl('', [Validators.required]),
      housekeeperId: new FormControl('', [Validators.required])
    });

    if (this.orderNo) {
      this.orderSvc.getIntentServiceOrder(this.orderNo).then(res => {
        this.isPaid = !!res.intentServiceOrder.paidamount;
        this.payUrl = res.payUrl;
      });
    }

    this.route.paramMap.switchMap((params: ParamMap) => this.employeeSvc.getHousekeeper(params.get('id'))).subscribe(res => {
      this.housekeeper = res.housekeeper;
      this.avatar = this.housekeeper.headimageurl ? this.config.prefix.wApi + this.housekeeper.headimageurl : '/assets/images/avatar.jpg';
      this.wx.config({
        title: '【大牛管家】推荐人才！' + this.housekeeper.name + '，' + this.housekeeper.soldierAge + '年军龄',
        desc: '军龄:' + this.housekeeper.soldierAge + '年，工作经验:' + this.housekeeper.servicetime + '年，' + this.housekeeper.drivinglicence + '驾照',
        link: Config.webHost + '/guide/w5/' + this.housekeeperId + '?gh=userShare',
        imgUrl: this.avatar
      }).then(() => {
        // 其它操作，可以确保注册成功以后才有效
        console.log('注册成功');
      }).catch((err: string) => {
        console.log(`注册失败，原因：${err}`);
      });

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
      this.imagesLen = 3;
    } else {
      this.imagesLen = 100;
    }
  }
}
