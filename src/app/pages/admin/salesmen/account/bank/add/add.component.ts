import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../../services/user.service';
import {DialogService} from 'ngx-weui';
import {PageConfig} from './page.config';
import {EmployerService} from '../../../../../../services/employer.service';
import {EmployeeService} from '../../../../../../services/employee.service';
import {RecruitService} from '../../../../../../services/recruit.service';

@Component({
  selector: 'app-admin-salesmen-account-bank-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AdminSalesmenAccountBankAddComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  bankForm: FormGroup;
  user: any;
  userInfo;

  loading = false;
  isSubmit = false;

  constructor(private userSvc: UserService,
              private dialog: DialogService,
              private employer: EmployerService,
              private employee: EmployeeService,
              private recruit: RecruitService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.bankForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      accountNo: new FormControl('', [Validators.required]),
      accountName: new FormControl('', [Validators.required]),
      bankName: new FormControl('', [Validators.required])
    });

    this.bankForm.get('custId').setValue(this.user.id);

    this.userInfo = this.employer.getEmployer(this.user.id).then(res => {
      this.userInfo = res.cust;
      console.log(this.userInfo);
    });
  }

  // 18620803688
  onSubmit() {
    this.isSubmit = true;
    if (this.loading || this.bankForm.invalid) {
      return false;
    }

    this.loading = true;
    this.recruit.addBank(this.bankForm.value).then(res => {
      this.loading = false;
      console.log(res);
      this.dialog.show({
        content: res.msg
      }).subscribe(data => {
        console.log(data);
        if (res.code === 0 && data.value) {
          window.history.back();
        }
      });
    });
  }
}
