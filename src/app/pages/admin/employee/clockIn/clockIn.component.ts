import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {PageConfig} from './page.config';
import {DateService} from '../../../../services/date.service';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MoService} from '../../../../services/mo.service';
import {GeoService} from '../../../../services/geo.service';

import {EmployeeService} from '../../../../services/employee.service';
import {DialogConfig, DialogService} from 'ngx-weui';

declare var mojs: any;
declare var $: any;
declare var qq: any;

interface DateItem {
  now: any; // 当前时间
  day: number; // 当前日期
  month: number; // 当前月份
  year: number;
  week: number; // 当前星期几
  count?: number; // 当前月份有几天
}

@Component({
  selector: 'app-admin-employee-clockIn',
  templateUrl: './clockIn.component.html',
  styleUrls: ['./clockIn.component.scss'],
  providers: [DatePipe]
})
export class AdminEmployeeClockInComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  private DEFCONFIG: DialogConfig = <DialogConfig>{
    title: '请填写好友的手机号码',
    content: '成功后，好友的手机号就是登录账号了。他也可以参与荐才行动，一起推荐拿补贴！',
    cancel: '取消',
    confirm: '确定',
    inputPlaceholder: '请填写好友的手机号码',
    inputError: '请填写正确的手机号码',
    inputRequired: true
  };

  clockForm: FormGroup;

  clocked: boolean = false;
  clocking: boolean = false;
  clockInType: number; // 0:无打卡,1:正常,2:迟到,3:请假,4:旷工

  dateNow: any = new Date(); // 当前时间

  currDateItem: DateItem = {
    now: this.dateNow,
    day: this.dateNow.getDate(),
    month: this.dateNow.getMonth() + 1,
    year: this.dateNow.getFullYear(),
    week: this.dateNow.getDay(),
    count: this.date.getCountDays(this.dateNow)
  };

  user: any;

  location: any = {};

  signInfo;

  constructor(private datePipe: DatePipe,
              private date: DateService,
              private geo: GeoService,
              private wx: WxService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employeeSvc: EmployeeService,
              private dialog: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.clockForm = new FormGroup({
      housekeeperId: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      signRemark: new FormControl('', [])
    });

    this.clockForm.get('housekeeperId').setValue(this.user.housekeeperId);

    this.employeeSvc.getSignInfo(this.user.housekeeperId).then(res => {
      if (res.code === 0) {
        this.signInfo = res.housekeeperSign;
      }
    });

    this.geo.get().then((res) => {
      const geolocation = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
      geolocation.getLocation((position) => {
        /*const markUrl = 'https://apis.map.qq.com/tools/poimarker' +
          '?marker=coord:' + position.lat + ',' + position.lng +
          ';title:我的位置;addr:' + (position.addr || position.city) +
          '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
        document.getElementById('markPage').src = markUrl;*/

        this.location.location = position.lat + ',' + position.lng;
        this.clockForm.get('location').setValue(position.lat + ',' + position.lng);

        this.geo.getPosition(this.location.location).then((result) => {
          this.location.address = result.result.address;
          this.clockForm.get('address').setValue(result.result.address);
        });
      }, (err) => {
        this.dialog.show({content: '请打开授权或打开定位开关', cancel: '', confirm: '我知道了'}).subscribe();
      }, {failTipFlag: true});
    });
  }

  submit(e) {
    setTimeout(() => {
      const cog = Object.assign({}, this.DEFCONFIG, <DialogConfig>{
        title: '备注',
        content: '',
        cancel: '取消',
        confirm: '打卡',
        inputPlaceholder: '请输入您本次打卡的备注',
        inputError: '请填写正确的备注',
        inputRequired: false,
        skin: 'auto',
        type: 'prompt',
        input: 'textarea',
        inputValue: undefined
      });

      this.dialog.show(cog).subscribe((data: any) => {
        console.log(data);
        if (data.value) {
          if (data.result) {
            this.clockForm.get('signRemark').setValue(data.result);
          }
          this.clockIn(e);
        }
      });
    });
  }

  clockIn(e): void {
    this.clocking = true;
    this.clocked = true;
    this.employeeSvc.clockIn(this.clockForm.value).then(result => {
      if (result.code === 0) {
        this.employeeSvc.getSignInfo(this.user.housekeeperId).then(res => {
          if (res.code === 0) {
            this.signInfo = res.housekeeperSign;
          }
        }).then(() => {
          let content = '<p>开始上班 ' + this.datePipe.transform(this.dateNow, 'HH:mm:ss') + '</p><p>新的一天开始了，加油哦！</p>';
          if (this.signInfo.actualcheckintime) {
            content = '<p>下班时间 ' + this.datePipe.transform(this.dateNow, 'HH:mm:ss') + '！</p>';
          }

          this.dialog.show({
            title: '打卡成功',
            content: content
          }).subscribe(res => {
            if (res === 'confirm') {
              // this.onSubmit();
            }
          });
        });
      } else {
        this.dialog.show({
          title: '系统提示',
          content: result.msg,
        }).subscribe(res => {
          if (res === 'confirm') {
            // this.onSubmit();
          }
        });
      }
    });
  }

}
