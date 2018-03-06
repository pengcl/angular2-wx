import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';
import {Config} from '../../../../../config';

@Component({
  selector: 'app-admin-employer-approvals-leaves',
  templateUrl: './leaves.component.html',
  styleUrls: ['./leaves.component.scss']
})
export class AdminEmployerApprovalsLeavesComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;
  user: any;
  approval: any = {};

  tabState = 'processing';
  processingList;
  processedList;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employer.getApprovalsLeave(this.user.id).then(res => {
      this.approval.processing = res.list.filter(k => {
        return k.dealstatus === 1 || k.dealstatus === 2;
      });
      this.approval.processed = res.list.filter(k => {
        return k.dealstatus === 3 || k.dealstatus === 4;
      });
    });
  }

  setTab(state) {
    this.tabState = state;
  }
}
