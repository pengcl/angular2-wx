import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {DatePipe} from '@angular/common';

import {PageConfig} from './page.config';
import {DialogService, PickerService} from 'ngx-weui';
import {UserService} from '../../../../services/user.service';
import {WorkService} from '../../../../services/work.service';
import {Config} from '../../../../config';

import {getThisWeek} from '../../../../utils/utils';

declare var $: any;

@Component({
  selector: 'app-admin-employee-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.scss'],
  providers: [DatePipe],
  encapsulation: ViewEncapsulation.None
})
export class AdminEmployeeWorkComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  config = Config;
  user: any;

  housekeeper: any;

  workForm: FormGroup;
  loading = false;
  isSubmit = false;
  theWeek;

  weeklyId = '';

  pickerData = {
    workDays: Array(7).fill('').map((v: number, idx: number) => `${idx + 1}`),
    workHours: ['20小时以下', '约20小时', '约25小时', '约30小时', '约35小时', '约40小时', '约45小时', '45小时以上']
  };

  weeks;

  constructor(private datePipe: DatePipe,
              private dialogSvc: DialogService,
              private pickerSvc: PickerService,
              private userSvc: UserService,
              private workSvc: WorkService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.theWeek = getThisWeek();

    this.workForm = new FormGroup({
      housekeeperId: new FormControl('', [Validators.required]),
      theYear: new FormControl('', [Validators.required]),
      theWeek: new FormControl('', [Validators.required]),
      beginTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required]),
      workDays: new FormControl('', [Validators.required]),
      workHours: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      workMistake: new FormControl('', [Validators.required]),
      workExperience: new FormControl('', [Validators.required]),
      workOpinion: new FormControl('', [Validators.required])
    });

    this.workForm.get('housekeeperId').setValue(this.user.housekeeperId);

    this.workForm.get('theYear').setValue(this.datePipe.transform(this.theWeek.first, 'yyyy'));
    this.workForm.get('theWeek').setValue(this.theWeek.week);

    this.workForm.get('title').setValue(this.datePipe.transform(this.theWeek.first, 'yyyy') + '年第' + this.theWeek.week + '周周报');

    this.workSvc.getThisWeek(this.workForm.value).then(res => {
      if (res.code === 0) {
        this.weeklyId = res.weekly.weeklyid;
        this.workForm.get('workDays').setValue(res.weekly.workdays);
        this.workForm.get('workHours').setValue(res.weekly.workhours);
        this.workForm.get('title').setValue(res.weekly.title);
        this.workForm.get('content').setValue(res.weekly.content);
        this.workForm.get('workMistake').setValue(res.weekly.workmistake);
        this.workForm.get('workExperience').setValue(res.weekly.workexperience);
        this.workForm.get('workOpinion').setValue(res.weekly.workopinion);
      }
    });

    this.workForm.get('beginTime').setValue(this.datePipe.transform(this.theWeek.first, 'yyyy-MM-dd'));
    this.workForm.get('endTime').setValue(this.datePipe.transform(this.theWeek.last, 'yyyy-MM-dd'));


    // 看周报
    this.workSvc.getWeeks(this.user.housekeeperId, 1).then(res => {
      console.log(res);
      this.weeks = res.list;
    });

  }

  pickerShow(target) {
    this.pickerSvc.show(this.pickerData[target], '', [this.workForm.get(target).value ? this.workForm.get(target).value - 1 : 0], {
      cancel: '返回',
      confirm: '确定'
    }).subscribe(res => {
      console.log(res);
      this.workForm.get(target).setValue(res.value);
    });
  }

  hoursPickerShow(target) {
    this.pickerSvc.show(this.pickerData[target], '', [this.workForm.get(target).value], {
      cancel: '返回',
      confirm: '确定'
    }).subscribe(res => {
      console.log(res);
      this.workForm.get(target).setValue(res.value);
    });
  }

  onSelect() {
  }

  submit() {
    this.isSubmit = true;
    if (this.loading) {
      return false;
    }

    if (!this.weeklyId) {
      this.workSvc.add(this.workForm.value).then(res => {
        let msg = '';
        if (res.code === 0) {
          msg = '周报保存成功';
        } else {
          msg = res.msg;
        }
        this.dialogSvc.show({content: msg, cancel: '', confirm: '我知道了'}).subscribe();
      });
    } else {
      const body = this.workForm.value;
      body.weeklyId = this.weeklyId;
      this.workSvc.update(this.workForm.value).then(res => {
        let msg = '';
        if (res.code === 0) {
          msg = '周报更新成功';
        } else {
          msg = res.msg;
        }
        this.dialogSvc.show({content: msg, cancel: '', confirm: '我知道了'}).subscribe();
      });
    }
  }

  back() {
    if (this.workForm.dirty && !this.isSubmit) {
      this.dialogSvc.show({content: '您的周报有新的内容未保存，确定要退出吗?', cancel: '返回', confirm: '确定'}).subscribe(data => {
        if (data.value) {
          window.history.back();
        }
      });
    } else {
      window.history.back();
    }
  }

}
