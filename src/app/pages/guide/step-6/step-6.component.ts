import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import 'rxjs/add/operator/switchMap';
import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';
import {UserService} from '../../../services/user.service';
import {EmployeeService} from '../../../services/employee.service';
import {OrderService} from '../../../services/order.service';
import {MeiqiaService} from '../../../services/meiqia.service';
import {Config} from '../../../config';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-guide-step6',
  templateUrl: './step-6.component.html',
  styleUrls: ['./step-6.component.scss']
})
export class GuideStep6Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  config = Config;

  housekeeperId;
  orderNo;
  orderId;

  content;

  contentForm: FormGroup;
  isSubmit = false;
  loading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private wx: WxService,
              private dialogSvc: DialogService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService,
              private orderSvc: OrderService,
              private meiqiaSvc: MeiqiaService) {
  }

  ngOnInit() {
    this.orderNo = this.route.snapshot.queryParams['orderNo'];
    this.housekeeperId = this.route.snapshot.params['id'];

    this.contentForm = new FormGroup({
      intentServiceOrderId: new FormControl('', [Validators.required]),
      housekeeperId: new FormControl('', [Validators.required]),
      weuiAgree: new FormControl('', [Validators.required, Validators.requiredTrue])
    });

    this.contentForm.get('housekeeperId').setValue(this.housekeeperId);

    this.orderSvc.getIntentServiceOrder(this.orderNo)
      .then(res => this.orderId = res.intentServiceOrder.serviceorderid)
      .then(orderId => {
        console.log('............1.............');
        this.contentForm.get('intentServiceOrderId').setValue(orderId);
        this.orderSvc.getContentByIntentOrderId(orderId, this.housekeeperId).then(content => {
          this.content = content.protocolContent;
          console.log(this.content);
        });
      });
  }

  contact() {
    this.meiqiaSvc.show();
  }

  reserve() {
    console.log(this.contentForm.value);
    this.isSubmit = true;
    if (this.loading || this.contentForm.invalid) {
      return false;
    }
    this.loading = true;
    this.orderSvc.relHousekeeperForIntent(this.contentForm.value).then(res => {
      this.loading = false;
      if (res.code === 0) {
        this.router.navigate(['/guide/step7']);
      } else {
        this.dialogSvc.show({content: res.msg, cancel: '', confirm: '我知道了！'}).subscribe();
      }
      console.log(res);
    });
  }
}
