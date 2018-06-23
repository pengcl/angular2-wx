import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {PickerService, DialogService} from 'ngx-weui';
import {UserService} from '../../../../../../services/user.service';
import {EmployeeService} from '../../../../../../services/employee.service';
import {MessagesService} from '../../../../../../services/messages.service';
import {DATA} from '../../../../../../utils/cn';

@Component({
  selector: 'app-admin-backend-housekeeper-message-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AdminBackendHousekeeperMessageAddComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  levels;

  sendForm: FormGroup;

  loading = false;
  isSubmit = false;

  constructor(private pickerSvc: PickerService,
              private dialogSvc: DialogService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService,
              private messagesSvc: MessagesService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.sendForm = new FormGroup({
      sender: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      content: new FormControl('', [Validators.required]),
      /*level: new FormControl('', [Validators.required]),
      area: new FormControl('', [Validators.required])*/
    });

    this.sendForm.get('sender').setValue(this.user.id);
    this.employeeSvc.getLevelList().then(res => {
      const levels = [];
      res.list.forEach(item => {
        const level = {label: '', value: ''};
        level.label = item.levelname;
        level.value = item.levelid;
        levels.push(level);
      });
      this.levels = levels;
      console.log(this.levels);
    });
  }

  onShow() {
    this.pickerSvc.show([this.levels], [], [0], {cancel: '返回', confirm: '确认'}).subscribe(res => {
      console.log(res);
      this.sendForm.get('level').setValue(res.value);
    });
  }

  showCity() {
    this.pickerSvc.showCity(DATA).subscribe(res => {
      this.sendForm.get('area').setValue(res.items[0].label + res.items[1].label + res.items[2].label);
    });
  }

  submit() {
    console.log(this.sendForm.value);
    this.isSubmit = true;
    if (this.loading || this.sendForm.invalid) {
      return false;
    }

    this.loading = true;
    this.messagesSvc.send(this.sendForm.value).then(res => {
      this.loading = false;
      if (res.code === 0) {
        window.history.back();
      } else {
        this.dialogSvc.show({content: res.msg, cancel: '', confirm: '我知道了'});
      }
    });
  }
}
