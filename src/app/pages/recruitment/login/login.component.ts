import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router, ActivatedRoute} from '@angular/router';

import {DialogService} from 'ngx-weui';
import {StorageService} from '../../../services/storage.service';
import {PageConfig} from './page.config';
import {Config} from '../../../config';
import {WxService} from '../../../modules/wx';

@Component({
  selector: 'app-recruitment-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class RecruitmentLoginComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  loginForm: FormGroup;
  // user: any;
  unionid;
  openid;

  activeText = '获取验证码';
  activeClass = true;
  second = 59;
  timePromise = undefined;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userSvc: UserService,
              private storage: StorageService,
              private dialog: DialogService,
              private wx: WxService) {
  }

  ngOnInit() {

    this.wx.config({
      title: '大牛管家诚聘优才',
      desc: '欢迎广大有志于高端管家助理服务的退伍军人，体育专业毕业生踊跃报名！',
      link: Config.webHost + '/front/resume/job',
      imgUrl: Config.webHost + '/assets/images/front/resume/share-icon.png'
    }).then(() => {
      console.log(true);
      // 其它操作，可以确保注册成功以后才有效
    }).catch((err: string) => {
      console.log(err);
    });

    this.loginForm = new FormGroup({
      mobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      code: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]),
      unionid: new FormControl('', []),
      openid: new FormControl('', []),
      refereeId: new FormControl('', []),
      gh: new FormControl('', []),
    });

    this.unionid = this.activatedRoute.snapshot.queryParams['unionid'] ? this.activatedRoute.snapshot.queryParams['unionid'] : '';
    this.openid = this.activatedRoute.snapshot.queryParams['openid'] ? this.activatedRoute.snapshot.queryParams['openid'] : '';

    this.loginForm.get('unionid').setValue(this.unionid);
    this.loginForm.get('openid').setValue(this.openid);
    this.loginForm.get('refereeId').setValue(this.activatedRoute.snapshot.queryParams['refereeId']);
    this.loginForm.get('gh').setValue(this.activatedRoute.snapshot.queryParams['gh']);

  }

  getCode(e, mobile) {
    if (!this.activeClass) {
      return false;
    }
    this.activeClass = false;
    this.userSvc.getCode(mobile).then(res => {
      if (res.code === 0) {
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
        this.activeClass = true;
        this.dialog.show({
          title: '系统提示',
          content: res.msg
        }).subscribe(data => {
          console.log(data);
        });
      }
    });
  }

  // 18620803688
  onSubmit() {
    if (this.loginForm.valid) {
      this.userSvc.login(this.loginForm.value).then(res => {
        if (res.code === 0) {
          const user = {id: res.custId, housekeeperId: ''};
          let callbackUrl = '/recruitment/index';
          this.storage.set('user', JSON.stringify(user));
          if (this.activatedRoute.snapshot.queryParams['callbackUrl']) {
            callbackUrl = this.activatedRoute.snapshot.queryParams['callbackUrl'];
          }
          setTimeout(() => {
            window.location.href = Config.webHost + callbackUrl;
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
