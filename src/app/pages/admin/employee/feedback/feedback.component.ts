import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EventService} from '../../../../services/event.service';
import {DialogService, UploaderOptions, Uploader} from 'ngx-weui';

import {Config} from '../../../../config';

@Component({
  selector: 'app-admin-employee-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class AdminEmployeeFeedbackComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  fileIds: any[] = [];
  eventForm: FormGroup;
  user: any;
  eventTypeId = 4;
  isSubmit;

  uploader: Uploader = new Uploader(<UploaderOptions>{
    url: Config.prefix.wApi + '/interface/comm/uploadFeedbackImage.ht',
    headers: [],
    params: {},
    auto: true,
    limit: 5,
    onUploadComplete: (a, b) => {
      this.fileIds.push(JSON.parse(b).fildId);
    }
  });

  constructor(private wx: WxService,
              private userSvc: UserService,
              private eventSvc: EventService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.eventForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      eventTypeId: new FormControl('', [Validators.required]),
      eventTitle: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      fileIds: new FormControl('', [])
    });
    this.eventForm.get('custId').setValue(this.user.id);
    this.eventForm.get('eventTypeId').setValue(this.eventTypeId);
  }

  onDel(item: any) {
    this.uploader.removeFromQueue(item.item);
  }

  onUpload() {
    this.uploader.uploadAll();
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.eventForm.valid) {
      this.eventSvc.addEvent(this.eventForm.value).then(res => {
        if (res.code === 1) {
          this.dialog.show({
            title: '系统提示',
            content: res.msg,
          }).subscribe((data: any) => {
            console.log(data);
          });
        } else {
          this.dialog.show({
            title: '提交成功',
            content: '<p>您的反馈已经我们已经收到，感谢您的宝贵意见！我们将继续努力为您提供更好的服务！</p>',
          }).subscribe((data: any) => {
            console.log(data);
          });
        }
      });
    }
  }

}
