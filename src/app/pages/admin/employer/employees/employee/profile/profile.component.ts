import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../services/user.service';
import {EmployeeService} from '../../../../../../services/employee.service';
import {ChartF2Service} from '../../../../../../modules/chart-f2';
import {Config} from '../../../../../../config';

import {RATES} from '../../../../../../../mockData/rates';

declare var $: any;
declare var F2: any;

@Component({
  selector: 'app-admin-employer-employees-employee-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AdminEmployerEmployeesEmployeeProfileComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  show: boolean = false;

  images;
  galleryCurrent = 0;

  housekeeper: any;

  rates = RATES;

  score = {
    scores: [],
    count: 0
  };

  chartSvcReady: boolean = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
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

    this.route.paramMap.switchMap((params: ParamMap) => this.employeeSvc.getHousekeeper(params.get('id'))).subscribe(res => {
      this.housekeeper = res.housekeeper;
      const images = [];
      $.each(this.housekeeper.imageList, function (i, k) {
        images.push(k.imageurl);
      });
      this.images = images;

      this.employeeSvc.getEmployeeScores(this.housekeeper.housekeeperid).then(scores => {
        // this.score.scores = scores;
        this.score.count = 0;
        scores.forEach(k => {
          const item = {name: this.housekeeper.name, props: k.props, value: k.value};
          this.score.scores.push(item);
          this.score.count = this.score.count + k.value;
        });

        if (this.score.count === 0) {
          return false;
        }
        this.chartSvc.get().then(result => {
          this.chartSvcReady = true;
        });
      });
    });
  }

}
