import {Component, OnInit, OnDestroy, ViewEncapsulation} from '@angular/core';
import {PageConfig} from './page.config';
import {Config} from '../../../config';

import {RecruitService} from '../../../services/recruit.service';
import {UserService} from '../../../services/user.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EmployerService} from '../../../services/employer.service';
import {EmployeeService} from '../../../services/employee.service';
import {DialogConfig, DialogService, ToastService} from 'ngx-weui';
import {WxService} from '../../../modules/wx';
import {Router, ActivatedRoute} from '@angular/router';
import {StorageService} from '../../../services/storage.service';

@Component({
  selector: 'app-recruitment-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RecruitmentIndexComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user;
  userInfo;

  channels;

  channelForm: FormGroup;

  private DEFCONFIG: DialogConfig = <DialogConfig>{
    title: '请填写好友的手机号码',
    content: '成功后，好友的手机号就是登录账号了。他也可以参与荐才行动，一起推荐拿补贴！',
    cancel: '取消',
    confirm: '确定',
    inputPlaceholder: '请填写好友的手机号码',
    inputError: '请填写正确的手机号码',
    inputRequired: true
  };
  config: DialogConfig = {};

  status: string;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private userSvc: UserService,
              private recruit: RecruitService,
              private employer: EmployerService,
              private employee: EmployeeService,
              private dialog: DialogService,
              private toast: ToastService,
              private wx: WxService,
              private storage: StorageService) {
  }

  ngOnInit() {

    const _dialog = this.dialog;
    this.wx.config({
      title: '大牛管家诚聘优才',
      desc: '欢迎广大有志于高端管家助理服务的退伍军人，体育专业毕业生踊跃报名！',
      link: Config.webHost + '/front/resume/job',
      imgUrl: Config.webHost + '/assets/images/front/resume/share-icon.png',
      success: () => {
        alert('分享成功');
        /*_dialog.show({content: '分享成功', cancel: '', confirm: '我知道了'}).subscribe(res => {
          console.log(res);
        });*/
      },
      cancel: function () {
        console.log('cancel');
      }
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
      this.status = '注册成功';
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
      this.status = `注册失败，原因：${err}`;
    });

    this.user = this.userSvc.isLogin();
    this.channelForm = new FormGroup({
      custId: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      channelName: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(4)])
    });

    this.channelForm.get('custId').setValue(this.user.id);

    this.userInfo = this.employer.getEmployer(this.user.id).then(res => {
      this.userInfo = res.cust;
    });

    this.recruit.getChannels(this.user.id).then(res => {
      if (res.code === 0) {
        this.channels = res.list;
        console.log(this.channels);
      }
    });
  }

  shareSuccess() {
    this.dialog.show({content: '分享成功', cancel: '', confirm: '我知道了'}).subscribe(res => {
      console.log(res);
    });
  }

  addChannel() {
    this.recruit.addChannel(this.channelForm.value)
      .then(res => res)
      .then(res => {
        this.recruit.getChannels(this.user.id).then(_res => {
          if (_res.code === 0) {
            this.channels = _res.list;
          }
        });
      });
  }

  showAddChannel() {
    setTimeout(() => {
      const cog = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
        title: '添加新渠道',
        content: '添加新的推荐渠道，可以帮您方便查看管理不同渠道的推荐人群，最多可以拥有30个渠道。',
        cancel: '取消',
        confirm: '确定',
        inputPlaceholder: '填上方便记住的名称，如：某某学院',
        inputError: '请填写正确的渠道名称',
        inputRequired: true,
        skin: 'auto',
        type: 'prompt',
        input: 'text',
        inputValue: undefined
      });

      this.dialog.show(cog).subscribe((data: any) => {
        if (data.result) {
          this.channelForm.get('channelName').setValue(data.result);
          this.addChannel();
          this.toast.show(`添加成功`);
        }
      });
    });
  }

  updateChannel(channelId, channelName) {
    this.recruit.updateChannel({channelId: channelId, channelName: channelName})
      .then(res => res)
      .then(res => {
        this.recruit.getChannels(this.user.id).then(_res => {
          if (_res.code === 0) {
            this.channels = _res.list;
          }
        });
      });
  }

  showUpdateChannel(channelId) {
    setTimeout(() => {
      const cog = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
        title: '修改名称',
        content: '',
        cancel: '取消',
        confirm: '确定',
        inputPlaceholder: '填上方便记住的名称，如：某某学院',
        inputError: '请填写正确的渠道名称',
        inputRequired: true,
        skin: 'auto',
        type: 'prompt',
        input: 'text',
        inputValue: undefined
      });

      this.dialog.show(cog).subscribe((data: any) => {
        if (data.result) {
          this.updateChannel(channelId, data.result);
          this.toast.show(`更新成功`);
        }
      });
    });
  }

  onShare(gh, state) {
    this.wx.config({
      title: '大牛管家诚聘优才',
      desc: '欢迎广大有志于高端管家助理服务的退伍军人，体育专业毕业生踊跃报名！',
      link: Config.webHost + '/front/resume/job?gh=' + gh + '&referee=' + this.user.id,
      imgUrl: Config.webHost + '/assets/images/front/resume/share-icon.png',
      success: () => {
        alert('分享成功');
      },
      cancel: function () {
        console.log('cancel');
      }
    }).then(() => {
      console.log(true);
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(err);
      // this.status = `注册失败，原因：${err}`;
    });
    this.wx.show(state).subscribe(res => {
      console.log(res);
    });
  }

  addFriend() {

    setTimeout(() => {
      const cog = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
        skin: 'auto',
        type: 'prompt',
        confirm: '确认',
        cancel: '取消',
        input: 'text',
        inputValue: undefined,
        inputRegex: /^1\d{10}$/
      });

      this.dialog.show(cog).subscribe((res: any) => {
        if (res.result) {
          this.router.navigate(['/recruitment/msg/friend'], {queryParams: {friend: res.result}});
        }
      });
    });

    return false;
  }

  ngOnDestroy() {
    this.wx.destroyAll();
  }
}
