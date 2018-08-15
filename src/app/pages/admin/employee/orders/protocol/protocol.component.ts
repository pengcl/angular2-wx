import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {map} from 'rxjs/operators';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';

declare var $: any;

@Component({
  selector: 'app-admin-employee-orders-protocol',
  templateUrl: './protocol.component.html',
  styleUrls: ['./protocol.component.scss']
})
export class AdminEmployeeOrdersProtocolComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  protocol;

  constructor(private route: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.route.paramMap.pipe(map((params) => params.get('id'))).subscribe(id => {
      this.employer.getProtocol(id).then(res => {
        if (res.code === 0) {
          this.protocol = res.protocolContent;
        }
      });
    });
  }
}
