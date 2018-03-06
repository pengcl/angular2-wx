import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {WxService} from '../../../../modules/wx';
import {Router, ActivatedRoute} from '@angular/router';

import {DialogService} from '../../../../modules/dialog';
import {StorageService} from '../../../../services/storage.service';
import {PageConfig} from './page.config';

declare var $: any;

@Component({
  selector: 'app-admin-register-recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.scss']
})
export class AdminRegisterRecruiterComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  registerForm: FormGroup;
  // user: any;

  constructor(private storage: StorageService,
              private dialog: DialogService) {
  }

  ngOnInit() {

    this.registerForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      code: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    });
  }

  // 18620803688
  onSubmit() {
    if (this.registerForm.valid) {
      /*this.userSvc.login(this.loginForm.get('mobile').value, this.loginForm.get('code').value).then(res => {
        if (res.code === 0) {
          const user = {id: res.custId, housekeeperId: ''};
          let callbackUrl = '/admin/employer';
          if (res.housekeeperId) {
            user.housekeeperId = res.housekeeperId;
            callbackUrl = '/admin/employee';
          }
          this.storage.set('user', JSON.stringify(user));
          if (this.activatedRoute.snapshot.queryParams['callbackUrl']) {
            callbackUrl = this.activatedRoute.snapshot.queryParams['callbackUrl'];
          }
          setTimeout(() => {
            this.router.navigate([callbackUrl], {});
          }, 100);
        } else {
          this.dialog.show({title: '系统提示', content: res.msg}).subscribe(data => {
            console.log(data);
          });
        }
      });*/
    }
  }
}
