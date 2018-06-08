import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployeeService} from '../../../../services/employee.service';
import {Config} from '../../../../config';
import {ChartF2Service} from '../../../../modules/chart-f2';
import {RatingConfig} from 'ngx-weui';
import {getRate} from '../../../../utils/utils';

declare var F2: any;

@Component({
  selector: 'app-admin-employee-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class AdminEmployeeServiceComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  rate = 5;
  user: any;

  employers;
  housekeeper;
  config = Config;

  score = {
    scores: [],
    count: 0
  };

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employee: EmployeeService,
              private chartSvc: ChartF2Service) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employee.getHousekeeper(this.user.housekeeperId).then(res => {
      this.housekeeper = res.housekeeper;

      this.employee.getEmployeeScores(this.user.housekeeperId).then(scores => {
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
    this.employee.getEmployer(this.user.housekeeperId, 2).then(res => {
      this.employers = res.list;
    });
  }
}
