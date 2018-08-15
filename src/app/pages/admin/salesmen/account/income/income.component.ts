
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';
import {SalesService} from '../../../../../services/sales.service';
import {InfiniteLoaderComponent, InfiniteLoaderConfig} from 'ngx-weui';
import {Config} from '../../../../../config';

@Component({
  selector: 'app-admin-salesmen-account-income',
  templateUrl: './income.component.html',
  styleUrls: ['./income.component.scss']
})
export class AdminSalesmenAccountIncomeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  userInfo;
  config = Config;

  incomeCount;
  incomeList;
  totalPage;
  page = 1;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private salesSvc: SalesService) {
  }

  ngOnInit() {

    this.user = this.userSvc.isLogin();
    this.employerSvc.getEmployer(this.user.id).then(res => {
      this.userInfo = res.cust;
    });
    /*{"createBy":null,"createtime":"2018-06-08 15:30:00","updatetime":null,"updateBy":null,"commisionid":null,"payid":null,"contid":null,"referee":null,"amount":null,"commisionratio":null,"commision":420.00,"createby":null,"type":1,"custName":"150****2507","levelName":"初级"}*/
    this.salesSvc.getIncomeCount(this.user.id).then(res => {
      if (res.code === 0) {
        this.incomeCount = res;
      }
    });

    this.salesSvc.getIncomeList(this.user.id, this.page).then(res => {
      this.incomeList = res.list;
      this.totalPage = res.totalPage;
    });
  }


  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(1500).subscribe(() => {

      this.page = this.page + 1;
      this.salesSvc.getIncomeList(this.user.id, this.page).then(res => {
        this.incomeList = this.incomeList.concat(res.list);
      });
      if (this.page >= this.totalPage) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }
}
