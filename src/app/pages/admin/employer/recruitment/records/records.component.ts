import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EmployerService} from '../../../../../services/employer.service';
import {StorageService} from '../../../../../services/storage.service';
import {PickerService} from 'ngx-weui';
import {RecruitService} from '../../../../../services/recruit.service';

@Component({
  selector: 'app-admin-employer-recruitment-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class AdminEmployerRecruitmentRecordsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  employer;

  tab;

  referee;

  recruiters = [];
  trainee;

  constructor(private wx: WxService,
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private storage: StorageService,
              private picker: PickerService,
              private recruit: RecruitService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.tab = this.storage.get('recruitmentRecords') ? this.storage.get('recruitmentRecords') : '';

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

    this.recruit.getRecruiters(this.user.id).then(res => {
      this.recruiters = res.list;
      console.log(this.recruiters);
    });

    this.recruit.getTrainees(this.user.id).then(res => {
      this.trainee = res;
      console.log(this.trainee);
    });

    this.employerSvc.getEmployer(this.user.id).then(res => {
      if (res.code === 0) {
        this.employer = res.cust;
        console.log(this.employer);
      }
    });
  }

  onPickerShow(type: string) {
    switch (type) {
      case 'date-ym':
        this.picker.showDateTime(type).subscribe((res: any) => {
          console.log(res);
        });
        break;
    }
  }

  onShare() {
    this.wx.show({}).subscribe(res => {
    });
  }

  setTab(tab) {
    this.tab = tab;
    this.storage.set('recruitmentTab', tab);
  }
}
