import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';

import {PageConfig} from './page.config';
import {UserService} from '../../../../../../services/user.service';
import {WorkService} from '../../../../../../services/work.service';
import {DialogService, PickerService} from 'ngx-weui';
import {Config} from '../../../../../../config';

declare var $: any;

@Component({
  selector: 'app-admin-backend-housekeeper-week-audit',
  templateUrl: './audit.component.html',
  styleUrls: ['./audit.component.scss']
})
export class AdminBackendHousekeeperWeekAuditComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  config = Config;
  user: any;

  weeklyId = '';
  week;

  auditForm: FormGroup;
  loading = false;
  isSubmit = false;

  pickerData = [
    {label: '总结的不错，请继续努力！', value: '总结的不错，请继续努力！'},
    {label: '反映的相关问题已经收到。', value: '反映的相关问题已经收到。'},
    {label: '需加强相关技能学习。', value: '需加强相关技能学习。'},
  ];

  constructor(private route: ActivatedRoute,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private userSvc: UserService,
              private workSvc: WorkService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.weeklyId = this.route.snapshot.params['id'];

    this.auditForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      weeklyId: new FormControl('', [Validators.required]),
      auditStatus: new FormControl('', [Validators.required]),
      auditFeedback: new FormControl('', [Validators.required]),
    });

    this.auditForm.get('custId').setValue(this.user.id);
    this.auditForm.get('weeklyId').setValue(this.weeklyId);
    this.auditForm.get('auditStatus').setValue(1);

    this.workSvc.getWeek(this.weeklyId).then(res => {
      if (res.code === 0) {
        this.week = res.weekly;
        if (res.weekly.auditstatus === 1) {
          this.auditForm.get('auditFeedback').setValue(res.weekly.auditfeedback);
        }
        console.log(this.week);
      }
    });
  }

  onPickerShow() {
    this.pickerSvc.show([this.pickerData], '', [0], {cancel: '返回', confirm: '确定'}).subscribe(res => {
      this.auditForm.get('auditFeedback').setValue(res.value);
    });
  }

  submit() {
    this.isSubmit = true;
    if (this.loading || this.auditForm.invalid) {
      return false;
    }
    this.loading = true;

    this.workSvc.audit(this.auditForm.value).then(res => {
      let msg = '';
      if (res.code === 0) {
        msg = '批复成功';
      } else {
        msg = res.msg;
      }

      this.dialogSvc.show({content: msg, cancel: '', confirm: '我知道了'}).subscribe(data => {
        window.history.back();
      });
    });
  }

}
