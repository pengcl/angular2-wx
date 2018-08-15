
import {switchMap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';



import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployeeService} from '../../../../../services/employee.service';
import {Config} from '../../../../../config';
import {EmployerService} from '../../../../../services/employer.service';
import {DatePipe} from '@angular/common';
import {getIndex} from '../../../../../utils/utils';

declare var $: any;
declare var F2: any;

@Component({
  selector: 'app-admin-employer-employees-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [DatePipe]
})
export class AdminEmployerEmployeesEmployeeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  user: any;

  housekeeper: any;
  contact;

  thisMonth;
  thisMonthItem;
  nextMonthItem;

  constructor(private route: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService,
              private employer: EmployerService,
              private datePipe: DatePipe) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.thisMonth = this.datePipe.transform(new Date(), 'yyyy年MM月');

    this.route.paramMap.pipe(switchMap((params: ParamMap) => this.employeeSvc.getHousekeeper(params.get('id')))).subscribe(res => {
      this.housekeeper = res.housekeeper;
    });
    this.employer.getContact(this.route.snapshot.queryParams['contactId']).then(res => {
      this.contact = res.cont;
      const index = getIndex(this.contact.periodList, 'periodmonth', this.thisMonth);
      this.thisMonthItem = this.contact.periodList[index];
      this.nextMonthItem = this.contact.periodList[index + 1];
    });
    /*this.route.snapshot.queryParams['contactId'];*/
  }

}
