import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {WXService} from '../../../services/wx.service';
import {UserService} from '../../../services/user.service';
import {ButlerService} from '../../../services/butler.service';
import {ActionSheetService, ActionSheetConfig} from '../../../components/actionsheet';

import {ACTIONSHEETS} from '../../../../mockData/actionSheets';
import {PickerService} from '../../../modules/picker';

import {DATA} from './city';
import {Config} from '../../../config';
import {DialogService} from '../../../modules/dialog';

declare var $: any;

const getServiceArea = function (ids, names) {
  ids = ids.split(',');
  names = names.split(',');
  const serviceAreaId = {
    type: 'serviceAreaId',
    title: '服务城市',
    data: []
  };
  for (let i = 0; i < ids.length; i++) {
    const obj = {text: names[i], value: ids[i]};
    serviceAreaId.data.push(obj);
  }
  return serviceAreaId;
};

@Component({
  selector: 'app-admin-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
  providers: [DatePipe]
})
export class AdminDetailsComponent implements OnInit, OnDestroy {
  reserveForm: FormGroup;
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  custId: string;
  custom: any;

  actionSheets = ACTIONSHEETS;

  menus: any[];
  extraShow: boolean = false;
  isSubmit: boolean = false;
  protocolShow: boolean = false;
  protocolContent;

  housekeeper;

  config: ActionSheetConfig = <ActionSheetConfig>{
    backdrop: true
  };

  constructor(private datePipe: DatePipe,
              private route: ActivatedRoute,
              private wx: WXService,
              private userSvc: UserService,
              private butlerSvc: ButlerService,
              private actionSheet: ActionSheetService,
              private picker: PickerService, private dialog: DialogService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.custId = this.userSvc.isLogin();
      this.userSvc.getCustom(this.custId).then(custom => {
        this.custom = custom.cust;
      });
    }
    this.reserveForm = new FormGroup({
      type: new FormControl('', [Validators.required]),
      custId: new FormControl('', [Validators.required]),
      housekeeperId: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      customerMobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      serviceStartDate: new FormControl('', [Validators.required]),
      servicePeriod: new FormControl('', [Validators.required]),
      workTypeIds: new FormControl('', [Validators.required]),
      workTypeNames: new FormControl('', [Validators.required]),
      serviceAreaId: new FormControl('', [Validators.required]),
      serviceAreaName: new FormControl('', [Validators.required]),
      startJobTime: new FormControl('', [Validators.required]),
      endJobTime: new FormControl('', [Validators.required]),
      workDay: new FormControl('', [Validators.required]),
      // restDay: new FormControl('', [Validators.required]),
      attendanceNotes: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      detailed: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      agree: new FormControl('', []),
    });

    this.route.paramMap.switchMap((params: ParamMap) => {
      this.reserveForm.get('type').setValue(0);
      this.reserveForm.get('custId').setValue(this.custId);
      this.reserveForm.get('housekeeperId').setValue(params.get('id'));
      return this.butlerSvc.getHousekeeper(+params.get('id'));
    }).subscribe(res => {
      this.housekeeper = res.housekeeper;
      this.actionSheets['serviceAreaId'] = getServiceArea(this.housekeeper.serviceareaids, this.housekeeper.serviceareanames);
    });
  }

  onShow(target, exTarget?) {
    this.config.title = '请选择' + this.actionSheets[target].title;
    this.menus = this.actionSheets[target].data;
    this.actionSheet.show(this.menus, this.config).subscribe((res: any) => {
      console.log(res);
      this.reserveForm.get(target).setValue(res.value);
      if (exTarget) {
        this.reserveForm.get(exTarget).setValue(res.text);
      }
    });
  }

  onShowExtra(show) {
    const $workDays = $('#workDay').find('.weui-check');
    let workDays = [];
    this.extraShow = show;
    if (!show) {
      for (let i = 0; i < $workDays.length; i++) {
        if ($workDays[i].checked) {
          workDays.push(i + 1);
        }
      }
    } else {
      workDays = [];
    }
    this.reserveForm.get('workDay').setValue(workDays);
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.reserveForm.valid) {// 表单验证成功
      if (this.reserveForm.get('type').value === 0) {// 获取协议
        this.butlerSvc.reserveButler(this.reserveForm.value).then(res => {

          if (res.code === 0) {

            this.reserveForm.get('type').setValue(1);
            this.protocolShow = true;
            this.protocolContent = res.protocolContent;

          } else {
            this.dialog.show({
              title: '系统提示',
              content: res.msg
            });
          }
        });
      } else {// 提交订单
        if (!this.reserveForm.get('agree').value) {// 不同意用户协议
          this.dialog.show({
            title: '系统提示',
            content: '请阅读并勾选同意本协议!'
          });
          return false;
        } else {// 同意用户协议
          this.butlerSvc.reserveButler(this.reserveForm.value).then(res => {
            if (res.code === 0 || res.code === '0') {
              window.location.href = res.msg;
            } else {
              this.dialog.show({
                title: '系统提示',
                content: res.msg
              });
            }
          });
        }
      }
    }
  }

  onPickerShow(type: string, formControlName) {
    switch (type) {
      /*case 'city':
        this.picker.showCity(this.cityData).subscribe((res: any) => {
          this.srvRes = res.value;
        });
        break;
      case 'date-ym':
        this.picker.showDateTime(type).subscribe((res: any) => {
          this.srvRes = res.value;
        });
        break;*/
      case 'date':
        this.picker.showDateTime(type).subscribe((res: any) => {
          const date = res.formatValue;
          this.reserveForm.get(formControlName).setValue(date);
        });
        break;
      /*case 'datetime':
        this.picker.showDateTime(type).subscribe((res: any) => {
          this.srvRes = res.value;
        });
        break;*/
      case 'time':
        this.picker.showDateTime(type).subscribe((res: any) => {
          const time = res.formatValue;
          this.reserveForm.get(formControlName).setValue(time);
        });
        break;
      /*case 'data':
        console.log(this.items);
        this.items = this.actionSheets[formControlName].data;
        this.picker.show(this.items, this.actionSheets[formControlName].data[0].value).subscribe((res: any) => {
          const date = res.value;
          this.reserveForm.get(formControlName).setValue(date);
          this.srvRes = date;
          this.srvRes = res.value;
        });
        break;*/
    }
  }

  ngOnDestroy() {
    this.actionSheet.destroyAll();
    this.picker.destroy();
  }
}
