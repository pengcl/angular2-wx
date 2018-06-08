import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {WxService} from '../../../modules/wx';
import {Router, ActivatedRoute} from '@angular/router';

import {DialogService} from 'ngx-weui';
import {StorageService} from '../../../services/storage.service';
import {PageConfig} from './page.config';

@Component({
  selector: 'app-admin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  unionid;
  openid;
  loginForm: FormGroup;
  // user: any;

  activeText = '获取验证码';
  activeClass = true;
  second = 59;
  timePromise = undefined;

  isKeyboardShow = false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private storage: StorageService,
              private dialog: DialogService) {
  }

  ngOnInit() {

    this.loginForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      code: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      unionid: new FormControl('', []),
      openid: new FormControl('', [])
    });

    this.unionid = this.activatedRoute.snapshot.queryParams['unionid'] ? this.activatedRoute.snapshot.queryParams['unionid'] : '';
    this.openid = this.activatedRoute.snapshot.queryParams['openid'] ? this.activatedRoute.snapshot.queryParams['openid'] : '';

    this.loginForm.get('unionid').setValue(this.unionid);
    this.loginForm.get('openid').setValue(this.openid);
  }

  getCode(mobile) {
    if (!this.activeClass) {
      return false;
    }
    this.userSvc.getCode(mobile).then(res => {
      if (res.code === 0) {
        this.activeClass = false;
        // $scope.loadingToast.open(false);
        this.timePromise = setInterval(() => {
          if (this.second <= 0) {
            clearInterval(this.timePromise);
            this.timePromise = undefined;

            this.second = 59;
            this.activeText = '重发验证码';
            this.activeClass = true;
          } else {
            this.activeText = '' + this.second;
            this.activeClass = false;
            this.second = this.second - 1;
          }
        }, 1000);
      } else {
        this.dialog.show({
          title: '系统提示',
          content: res.msg
        }).subscribe(data => {
          console.log(data);
        });
      }
      console.log(res);
    });
  }

  // 18620803688
  onSubmit() {
    if (this.loginForm.valid) {
      this.userSvc.login(this.loginForm.value).then(res => {
        if (res.code === 0) {
          const user = {id: res.custId, housekeeperId: res.housekeeperId, admin: res.isUser, gh: res.gh, custType: res.custType};
          let callbackUrl = '/admin/salesmen/home';
          if (res.custType === 0) {
            callbackUrl = '/admin/employee';
          } else if (res.custType === 1) {
            callbackUrl = '/admin/employer';
          } else {
            if (res.agentAuditStatus === 1) {
              callbackUrl = '/admin/salesmen/home';
            } else {
              callbackUrl = '/admin/employer';
            }
          }
          this.storage.set('user', JSON.stringify(user));
          /*if (this.activatedRoute.snapshot.queryParams['callbackUrl']) {
            callbackUrl = this.activatedRoute.snapshot.queryParams['callbackUrl'];
          }*/
          setTimeout(() => {
            this.router.navigate([callbackUrl], {});
          }, 100);
        } else {
          this.dialog.show({title: '系统提示', content: res.msg}).subscribe(data => {
            console.log(data);
          });
        }
      });
    }
  }
}
