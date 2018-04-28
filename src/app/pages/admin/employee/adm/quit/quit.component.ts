import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {UserService} from '../../../../../services/user.service';
import {EventService} from '../../../../../services/event.service';
import {PickerService, DialogService} from 'ngx-weui';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-admin-employee-event-quit',
  templateUrl: './quit.component.html',
  styleUrls: ['./quit.component.scss'],
  providers: [DatePipe]
})
export class AdminEmployeeADMQuitComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  eventForm: FormGroup;
  user: any;
  eventTypeId;
  isSubmit;

  constructor(private router: Router,
              private wx: WxService,
              private userSvc: UserService,
              private picker: PickerService,
              private datePipe: DatePipe,
              private event: EventService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.eventTypeId = 4;

    this.eventForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      eventTypeId: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      eventTitle: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
    });
    this.eventForm.get('custId').setValue(this.user.id);
    this.eventForm.get('eventTypeId').setValue(this.eventTypeId);

    this.event.getEventList({
      custId: this.user.id,
      type: this.eventTypeId
    }).then(res => {
      if (res.list && res.list.length > 0) {
        this.dialog.show({
          title: '系统提示',
          content: '您已经申请过离职，请不要重复申请',
          cancel: '返回',
          confirm: '查看进度'
        }).subscribe(data => {
          if (data === 'confirm') {
            this.router.navigate(['/admin/employee/ADM/approvals/events', this.eventTypeId], {});
          }
          if (data === 'cancel') {
            window.history.back();
          }
        });
      }
    });
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

  makeSure() {
    this.dialog.show({
      title: '确认离职信息',
      content: '您提出将在 ' + this.datePipe.transform(this.eventForm.get('startDate').value, 'yyyy年MM月dd日') + ' 离职，是否确定？',
    }).subscribe((res: any) => {
      if (res.value) {
        this.onSubmit();
      }
    });
    return false;
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.eventForm.valid) {
      this.event.addEvent(this.eventForm.value).then(res => {
        if (res.code === 1) {
          this.dialog.show({
            title: '系统提示',
            content: res.msg,
          }).subscribe((data: any) => {
          });
        } else {
          this.dialog.show({
            title: '申请已提交',
            content: '<p>请留意后续沟通，做好交接工作，感谢您的付出！</p><p>如为误操作，请撤销或联系客服。</p>',
          }).subscribe((data: any) => {
          });
        }
      });
    }
  }

}
