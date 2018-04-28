import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployeeService} from '../../../../services/employee.service';
import {ChartF2Service} from '../../../../modules/chart-f2';
import {Config} from '../../../../config';

import {RATES} from '../../../../../mockData/rates';
import {getRate} from '../../../../utils/utils';
import {RatingConfig} from 'ngx-weui';

declare var $: any;
declare var F2: any;

@Component({
  selector: 'app-front-employees-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrontEmployeesEmployeeComponent implements OnInit {
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

  constructor(private router: Router,
              private route: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService,
              private chartSvc: ChartF2Service) {
  }

  showGallery(current) {
    this.show = true;
    this.galleryCurrent = current;
  }

  onDelete(item: any) {
  }

  ngOnInit() {
    this.gh = this.route.snapshot.queryParams['gh'];
    this.route.paramMap.switchMap((params: ParamMap) => this.employeeSvc.getHousekeeper(params.get('id'))).subscribe(res => {
      this.housekeeper = res.housekeeper;
      console.log(this.housekeeper);
      const images = [];
      $.each(this.housekeeper.imageList, function (i, k) {
        images.push(k.imageurl);
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

        console.log(this.score);

        if (this.score.count === 0) {
          return false;
        }

        this.rate = getRate(this.score.count / scores.length);

        /*this.chartSvc.get().then(result => {
          F2.Global.pixelRatio = window.devicePixelRatio;
          const data = this.score.scores;

          const chart = new F2.Chart({
            id: 'mountNode'
          });

          chart.coord('polar');
          chart.source(data, {
            value: {
              min: 0,
              tickInterval: 20
            }
          });


          // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
          chart.axis('props', {
            label: {
              fontSize: 12
            },
            line: null
          });
          chart.axis('value', {
            label: null,
            line: null
          });

          chart.area().position('props*value').color('name').style({
            opacity: 0.6,
            background: '#FBA703'
          });
          // x和y轴同时缩放的动画
          chart.animate({
            type: 'scalexy'
          });
          chart.render();
        });*/
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

  reserve(canReserve) {
    if (!canReserve) {
    } else {
      this.router.navigate(['/front/employees/employee/reserve', this.housekeeper.housekeeperid], {queryParamsHandling: 'merge'});
    }
  }

}
