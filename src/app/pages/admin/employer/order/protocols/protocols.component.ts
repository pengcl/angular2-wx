
import {switchMap} from 'rxjs/operators';
import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {PageConfig} from './page.config';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';

declare var $: any;

@Component({
  selector: 'app-admin-employer-order-protocols',
  templateUrl: './protocols.component.html',
  styleUrls: ['./protocols.component.scss']
})
export class AdminEmployerOrderProtocolsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  protocol;

  agreeForm: FormGroup;
  no;

  constructor(private activatedRoute: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.no = this.activatedRoute.snapshot.queryParams['no'];

    this.agreeForm = new FormGroup({
      agree: new FormControl('', [Validators.required, Validators.requiredTrue]),
    });

    this.activatedRoute.paramMap.pipe(switchMap((params: ParamMap) => this.employer.getProtocol(params.get('id')))).subscribe(res => {
      if (res.code === 0) {
        this.protocol = res.protocolContent;
      }
    });
  }

  submit() {
    window.location.href = 'http://pay.danius.cn/interface/payment/gotoPay.ht?orderNo=' + this.no;
  }
}
