
import {switchMap} from 'rxjs/operators';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';


import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';
import {LogService} from '../../../services/log.service';
import {UserService} from '../../../services/user.service';
import {EmployeeService} from '../../../services/employee.service';
import {OrderService} from '../../../services/order.service';
import {Config} from '../../../config';

import {DetailsPipe} from '../../../pipes/pipes.pipe';
import {getRate} from '../../../utils/utils';
import {RatingConfig, DialogService} from 'ngx-weui';
import {FormControl, FormGroup, Validators} from '@angular/forms';

declare var $: any;

@Component({
  selector: 'app-guide-w-n-step5',
  templateUrl: './step-5.component.html',
  styleUrls: ['./step-5.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GuideWNStep5Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  htmlItems;

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
              private domSanitizer: DomSanitizer,
              private detailsPipe: DetailsPipe,
              private dialogSvc: DialogService,
              private wx: WxService,
              private logSvc: LogService,
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

    this.contentForm.get('housekeeperId').setValue(this.housekeeperId);

    if (this.orderNo) {
      this.orderSvc.getIntentServiceOrder(this.orderNo).then(res => {
        this.contentForm.get('intentServiceOrderId').setValue(res.intentServiceOrder.serviceorderid);
        this.isPaid = !!res.intentServiceOrder.paidamount;
        this.payUrl = res.payUrl;
      });
    }

    /*this.datePipe.transform(myDate, 'yyyy-MM-dd');*/

    this.route.paramMap.pipe(switchMap((params: ParamMap) => this.employeeSvc.getHousekeeper(params.get('id')))).subscribe(res => {
      this.housekeeper = res.housekeeper;

      setTimeout(() => {
        const sectionItems = $('#details').find('section');
        const hItems = $('#details').find('h3');
        const htmlItems = [];
        for (let i = 0; i < hItems.length; i++) {
          htmlItems.push({h: hItems[i].innerHTML, section: sectionItems[i].innerHTML});
        }
        this.htmlItems = htmlItems;
      });
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

    this.logSvc.pageLoad('WDetail', this.gh);
  }

  showMore() {
    if (this.imagesLen === 100) {
      this.imagesLen = 3;
    } else {
      this.imagesLen = 100;
    }
  }

  go(type) {
    if (this.housekeeper.issubscribe !== 2) {
      return false;
    }
    this.logSvc.__log(type === 1 ? 'rent' : 'engage', 'WDetail', this.gh);
    this.router.navigate(['/guide/w6', this.housekeeperId], {queryParams: {type: type, gh: this.gh, orderNo: this.orderNo}});
  }

  reserve() {
    this.isSubmit = true;
    if (this.loading || this.contentForm.invalid) {
      return false;
    }
    this.loading = true;
    this.orderSvc.relHousekeeperForIntent(this.contentForm.value).then(res => {
      this.loading = false;
      if (res.code === 0) {
        if (this.isPaid) {
          this.router.navigate(['/guide/w8'], {queryParams: {orderNo: this.orderNo}});
        } else {
          window.location.href = this.payUrl;
        }
        // this.router.navigate(['/guide/step7']);
      } else {
        this.dialogSvc.show({content: res.msg, cancel: '', confirm: '我知道了！'}).subscribe();
      }
      console.log(res);
    }).then(() => {
    });
  }
}
