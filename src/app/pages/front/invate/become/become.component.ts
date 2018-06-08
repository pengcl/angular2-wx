import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageConfig} from './page.config';
import {StorageService} from '../../../../services/storage.service';
import {DialogService} from 'ngx-weui';
import {SalesService} from '../../../../services/sales.service';
import {EmployerService} from '../../../../services/employer.service';
import {Config} from '../../../../config';

@Component({
  selector: 'app-front-invite-become',
  templateUrl: './become.component.html',
  styleUrls: ['./become.component.scss']
})
export class FrontInviteBecomeComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  userInfo;
  referee;
  config = Config;

  becomeForm: FormGroup;
  loading = false;
  isSubmit = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private storageSvc: StorageService,
              private dialogSvc: DialogService,
              private salesSvc: SalesService,
              private employerSvc: EmployerService) {
  }

  ngOnInit() {

    if (this.storageSvc.get('user')) {
      this.user = JSON.parse(this.storageSvc.get('user'));
    }
    this.becomeForm = new FormGroup({
      referee: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      idcard: new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(18)]),
      bankName: new FormControl('', [Validators.required]),
      accountNo: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(20)]),
      accountName: new FormControl('', [Validators.required]),
      openId: new FormControl('', []),
      unionId: new FormControl('', [])
    });

    this.referee = this.route.snapshot.queryParams['referee'] || '';

    this.becomeForm.get('referee').setValue(this.referee);

    this.employerSvc.getEmployer(this.referee).then(res => {
      this.userInfo = res.cust;
      console.log(res);
    });


    if (this.user && this.user.hasOwnProperty('openid')) {
      this.becomeForm.get('openId').setValue(this.user.openid || '');
      this.becomeForm.get('unionId').setValue(this.user.unionid || '');
    }

  }

  submit() {
    console.log(this.becomeForm.value);
    this.isSubmit = true;
    if (this.loading || this.becomeForm.invalid) {
      return false;
    }
    this.loading = true;
    this.salesSvc.become(this.becomeForm.value).then(res => {
      if (res.code === 0) {
        this.loading = false;
        this.router.navigate(['/admin/salesmen/success']);
      } else {
        this.dialogSvc.show({content: res.msg, cancel: '', confirm: '我知道了'});
      }
    });
  }
}
