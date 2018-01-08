import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';
import {WXService} from '../../../../services/wx.service';
import {UserService} from '../../../../services/user.service';

@Component({
  selector: 'app-admin-form-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class AdminFormLeaveComponent implements OnInit {
  leaveForm: FormGroup;
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;

  constructor(private wx: WXService, private userSvc: UserService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }
    this.leaveForm = new FormGroup({
      changeButler: new FormControl('', [Validators.required]),
      reason: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)])
    });
  }

  onSubmit() {
    console.log(this.leaveForm.value.reason.length);
    if (this.leaveForm.valid) {
    }
  }

}
