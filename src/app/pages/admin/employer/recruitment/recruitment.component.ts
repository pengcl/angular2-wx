import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployerService} from '../../../../services/employer.service';
import {StorageService} from '../../../../services/storage.service';

@Component({
  selector: 'app-admin-employer-recruitment',
  templateUrl: './recruitment.component.html',
  styleUrls: ['./recruitment.component.scss']
})
export class AdminEmployerRecruitmentComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  accountForm: FormGroup;
  isSubmit: boolean = false;

  user: any;
  employer;

  tab;

  referee;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private storage: StorageService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.tab = this.storage.get('recruitmentTab') ? this.storage.get('recruitmentTab') : '';

    this.accountForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      no: new FormControl('', [Validators.required, Validators.minLength(13), Validators.maxLength(19)]),
      name: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]),
      bank: new FormControl('', [Validators.required])
    });

    this.wx.config({
      success: function () {
        console.log(this);
        this.router.navigate(['/front/index'], {});
      },
      cancel: function () {
        console.log('cancel');
      }
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });

    this.employerSvc.getEmployer(this.user.id).then(res => {
      if (res.code === 0) {
        this.employer = res.cust;
        console.log(this.employer);
      }
    });
  }

  onShare(state) {
    this.wx.config({
      success: function () {
        console.log(this);
        this.router.navigate(['/front/index'], {});
      },
      cancel: function () {
        console.log('cancel');
      }
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });
    this.wx.show(state).subscribe(res => {
    });
  }

  setTab(tab) {
    this.tab = tab;
    this.storage.set('recruitmentTab', tab);
  }

  onSubmit() {
    this.isSubmit = true;
  }
}
