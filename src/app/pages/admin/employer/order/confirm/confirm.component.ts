import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {PageConfig} from './page.config';
import {ActivatedRoute, Router} from '@angular/router';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';
import {OrderService} from '../../../../../services/order.service';

import {formatOrder} from '../../../../../utils/utils';
import {DialogService} from 'ngx-weui';

declare var $: any;

@Component({
  selector: 'app-admin-employer-order-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss']
})
export class AdminEmployerOrderConfirmComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  order;

  confirmForm: FormGroup;

  isSubmit = false;
  loading = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private employer: EmployerService,
              private orderSvc: OrderService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.confirmForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      contId: new FormControl('', [Validators.required]),
      confirmPay: new FormControl('', [Validators.required]),
      accountNo: new FormControl('', [Validators.required]),
      custPayType: new FormControl('', [Validators.required])
    });

    this.confirmForm.get('custPayType').setValue('bank');

    this.confirmForm.get('custId').setValue(this.user.id);
    this.confirmForm.get('contId').setValue(this.activatedRoute.snapshot.params['id']);
    this.confirmForm.get('confirmPay').setValue(1);

    this.orderSvc.getOrder(this.activatedRoute.snapshot.params['id']).then(res => {
      this.order = formatOrder(res.cont);
    });
  }

  setType(type) {
    this.confirmForm.get('custPayType').setValue(type);
  }

  submit() {
    console.log(this.confirmForm.value);
    if (this.loading) {
      return false;
    }
    this.isSubmit = true;
    if (this.confirmForm.invalid) {
      return false;
    }
    this.orderSvc.confirmPay(this.confirmForm.value).then(res => {
      if (res.code === 0) {
        this.router.navigate(['/admin/employer/order/success', this.activatedRoute.snapshot.params['id']]);
      } else {
        this.dialog.show({
          title: '系统提示',
          content: res.msg,
          cancel: '',
          confirm: '我知道了'
        }).subscribe();
      }
    });
  }
}
