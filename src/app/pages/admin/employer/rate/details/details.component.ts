import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {UserService} from '../../../../../services/user.service';
import {RatingConfig} from 'ngx-weui';


import {ActivatedRoute} from '@angular/router';
import {EmployerService} from '../../../../../services/employer.service';

@Component({
  selector: 'app-admin-employer-rate-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AdminEmployerRateDetailsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  employees;
  contMainPayId;
  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  rate: number = 3;

  constructor(private userSvc: UserService,
              private router: ActivatedRoute,
              private employerSvc: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.contMainPayId = this.router.snapshot.paramMap.get('id');
    this.employerSvc.getRate(this.contMainPayId, 0).then(res => {
      this.employees = res.list;
      console.log(res);
    });
  }

}
