import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {EmployeeService} from '../../../../../../services/employee.service';
import {Observable} from 'rxjs/Observable';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

import {getDays} from '../../../../../../utils/utils';

@Component({
  selector: 'app-admin-backend-housekeeper-sign-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminBackendHousekeeperSignItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  housekeeper;

  signs;
  signInfo;

  dateNow: any = new Date(); // 当前时间

  currDateItem = {
    day: this.dateNow.getDate(),
    month: this.dateNow.getMonth() + 1,
    year: this.dateNow.getFullYear(),
  };

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private route: ActivatedRoute,
              private pickerSvc: PickerService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService) {
  }

  ngOnInit() {

    console.log(this.currDateItem);

    this.user = this.userSvc.isLogin();

    this.employeeSvc.getHousekeeper(this.route.snapshot.params['id']).then(res => {
      this.housekeeper = res.housekeeper;
    });

    this.getSigns(new Date(this.currDateItem.year, this.currDateItem.month - 1, 1));
  }

  getSigns(date) {
    const signs = getDays(date);
    const _signs = [];
    const _body = {
      housekeeperId: this.route.snapshot.params['id'],
      year: this.currDateItem.year,
      month: this.currDateItem.month >= 10 ? this.currDateItem.month : '0' + this.currDateItem.month
    };

    this.employeeSvc.getMonthSignInfo(_body).then(res => {
      this.signInfo = res.sign;
      signs.curr.forEach(item => {
        const sign = {
          in: {
            time: '',
            address: ''
          },
          out: {
            time: '',
            address: ''
          }
        };

        res.list.forEach(_sign => {
          const day = (item.day > 9 ? item.day : '0' + item.day).toString();
          if (day === _sign.actualcheckintime.split(' ')[0].split('-')[2]) {
            sign.in = {
              time: _sign.actualcheckintime ? _sign.actualcheckintime.split(' ')[1].split(':')[0] + ':' + _sign.actualcheckintime.split(' ')[1].split(':')[1] : '',
              address: _sign.startaddress
            };
            sign.out = {
              time: _sign.actualcheckouttime ? _sign.actualcheckouttime.split(' ')[1].split(':')[0] + ':' + _sign.actualcheckouttime.split(' ')[1].split(':')[1] : '',
              address: _sign.endaddress
            };
          }
        });

        item['sign'] = sign;

        _signs.push(item);
      });
      this.signs = _signs;
      console.log(this.signs);
    });
  }

  pickerDate() {
    this.pickerSvc.showDateTime('date-ym').subscribe(res => {
      this.currDateItem.year = res.items[0].value;
      this.currDateItem.month = res.items[1].value;
      this.getSigns(new Date(this.currDateItem.year, this.currDateItem.month - 1, 1));
      console.log(res);
    });
  }

  back() {
    window.history.back();
  }
}
