import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../services/user.service';
import {Router, ActivatedRoute} from '@angular/router';

import {DialogService} from 'ngx-weui';
import {StorageService} from '../../../../../services/storage.service';
import {PageConfig} from './page.config';
import {EmployerService} from '../../../../../services/employer.service';
import {EmployeeService} from '../../../../../services/employee.service';
import {RecruitService} from '../../../../../services/recruit.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-admin-salesmen-account-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.scss']
})
export class AdminSalesmenAccountWithdrawComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  withdrawForm: FormGroup;
  user: any;
  userInfo;

  loading = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private userSvc: UserService,
              private storage: StorageService,
              private dialog: DialogService,
              private employer: EmployerService,
              private employee: EmployeeService,
              private recruit: RecruitService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.withdrawForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      amount: new FormControl('', [Validators.required, Validators.min(1)])
    });

    this.userInfo = this.employer.getEmployer(this.user.id).then(res => {
      this.userInfo = res.cust;
      this.withdrawForm.get('custId').setValue(this.user.id);
      this.withdrawForm.get('amount').setValidators([Validators.required, Validators.min(1), Validators.max(this.userInfo.balance)]);
      this.withdrawForm.get('amount').setValue(this.userInfo.balance);
    });
  }

  // 18620803688
  onSubmit() {
    if (this.withdrawForm.valid || !this.loading) {
      this.loading = true;
      this.recruit.withdraw(this.withdrawForm.value).then(res => {
        this.loading = false;
        if (res.code === 0) {
          this.router.navigate(['/recruitment/msg/success'], {});
          this.dialog.show({
            content: '您已提现￥' + res.draw.drawamount + '，账户剩余￥' + res.balance,
            cancel: '',
            confirm: '我知道了'
          }).subscribe(data => {
            console.log(data);
          });
        } else {
          this.dialog.show({
            content: res.msg,
            cancel: '',
            confirm: '我知道了'
          }).subscribe(data => {
            console.log(data);
          });
        }
      });
    }
  }

  back(){
    this.location.back();
  }
}
