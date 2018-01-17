import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {WXService} from '../../../../services/wx.service';
import {UserService} from '../../../../services/user.service';
import {EventService} from '../../../../services/event.service';
import {PickerService} from '../../../../modules/picker';
import {DatePipe} from '@angular/common';
import {DialogService} from '../../../../modules/dialog';

const leaveDate = function (start, end) {

};

@Component({
  selector: 'app-admin-form-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss'],
  providers: [DatePipe]
})
export class AdminFormEventComponent implements OnInit {
  eventForm: FormGroup;
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;
  eventTypeId;
  isSubmit;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private wx: WXService,
              private userSvc: UserService,
              private picker: PickerService,
              private datePipe: DatePipe,
              private eventSvc: EventService,
              private dialog: DialogService) {
    this.eventTypeId = route.snapshot.params.eventTypeId;
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }

    this.eventForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      eventTypeId: new FormControl('', [Validators.required]),
      isNeedHousekeeper: new FormControl('', []),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      eventTitle: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
    });
    this.eventForm.get('custId').setValue('10000096020354');
    this.eventForm.get('eventTypeId').setValue(this.eventTypeId);
    this.eventForm.get('isNeedHousekeeper').setValue(1);
  }

  onPickerShow(type: string, formControlName) {
    switch (type) {
      case 'datetime':
        this.picker.showDateTime(type).subscribe((res: any) => {
          this.eventForm.get(formControlName).setValue(res.formatValue);
        });
        break;
    }
  }

  needHousekeeper() {
    if (this.eventForm.get('isNeedHousekeeper').value === 1) {
      this.eventForm.get('isNeedHousekeeper').setValue(2);
    } else {
      this.eventForm.get('isNeedHousekeeper').setValue(1);
    }
  }

  makeSure() {
    this.dialog.show({
      title: '确认请假信息',
      content: '您将于' + this.eventForm.get('startDate').value + '至' + this.eventForm.get('endDate').value + '请假，请假时长合共' + '天',
    }).subscribe((res: any) => {
      console.log(res);
      if (res === 'confirm') {
        this.onSubmit();
      }
    });
    return false;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.eventForm.valid) {
      this.eventSvc.addEvent(this.eventForm.value).then(result => {
        result = JSON.parse(result);
        if (result.code === 1) {
          this.dialog.show({
            title: '系统提示',
            content: result.msg,
          });
        } else {
          this.dialog.show({
            title: '请假申请提交成功',
            content: '<p>请注意与客户做好请假的沟通工作，并提醒客户确认您的请假申请。</p><p>如有问题，可与客服人员联系。</p>',
          }).subscribe((res: any) => {
            console.log(res);
          });
        }
      });
    }
  }

}
