import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';
import {formatOrder} from '../../../../../utils/utils';

@Component({
  selector: 'app-admin-employer-order-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AdminEmployerOrderDetailsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  order;

  constructor(private router: ActivatedRoute, private wx: WxService, private userSvc: UserService, private employer: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employer.getOrder(this.router.snapshot.paramMap.get('conId')).then(res => {
      this.order = formatOrder(res.cont);
    });
  }

}
