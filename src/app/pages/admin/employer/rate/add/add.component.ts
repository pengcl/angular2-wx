import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageConfig} from './page.config';
import {UserService} from '../../../../../services/user.service';
import {RatingConfig} from 'ngx-weui';

import {ActivatedRoute} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {Config} from '../../../../../config';
import {DialogService} from 'ngx-weui';
import {EmployerService} from '../../../../../services/employer.service';

@Component({
  selector: 'app-admin-employer-rate-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminEmployerRateAddComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  impressList;

  user: any;
  contMainPayId;
  employees;

  config = Config;

  ratingConfig: RatingConfig = {
    cls: 'rating',
    stateOff: 'off',
    stateOn: 'on'
  };

  level: number = 5;

  constructor(private userSvc: UserService,
              private router: ActivatedRoute,
              private employerSvc: EmployerService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.contMainPayId = this.router.snapshot.paramMap.get('id');

    this.employerSvc.getRate(this.contMainPayId).then(res => {
      this.employees = res.list;
      console.log(res);
    });

    this.employerSvc.getImpressList().then(res => {
      this.impressList = res.list;
    });
  }

  setImpressions(value, id) {
    let impressions;
    if (value) {
      impressions = value.split(',');
    } else {
      impressions = [];
    }

    if (impressions.indexOf('' + id) === -1) {
      impressions.push(id);
    } else {
      impressions = impressions.filter((ele) => {
        return ele !== '' + id;
      });
    }
    return impressions.toString();
  }

  onConsole(form) {
    console.log(form);
  }

  onSubmit(form, employee) {
    console.log(form, employee);
    if (form.valid) {
      this.employerSvc.addRate(form.value).then(res => {
        console.log(res);
        this.dialog.show({
          title: '系统提示',
          content: res.msg
        }).subscribe(data => {
        });
      });
    }
  }

}
