import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {EmployeeService} from '../../../../../services/employee.service';

import {ACTIONSHEETS} from '../../../../../../mockData/actionSheets';
import {PickerService, DialogService, ActionSheetService, ActionSheetConfig} from 'ngx-weui';

import {LogService} from '../../../../../services/log.service';
import {validScroll} from '../../../../../utils/utils';

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
  selector: 'app-front-employees-employee-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss'],
  providers: [DatePipe]
})
export class FrontEmployeesEmployeeReserveComponent implements OnInit, OnDestroy {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  reserveForm: FormGroup;

  @ViewChild('scrollMe') private container: any;

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
              private wx: WxService,
              private employeeSvc: EmployeeService,
              private actionSheet: ActionSheetService,
              private picker: PickerService, private dialog: DialogService,
              private logSvc: LogService) {
  }

  ngOnInit() {
    this.reserveForm = new FormGroup({
      gh: new FormControl('', []),
      type: new FormControl('', [Validators.required]),
      custId: new FormControl('', []),
      housekeeperId: new FormControl('', [Validators.required]),
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
      attendanceNotes: new FormControl('', []),
      detailed: new FormControl('', []),
      customerName: new FormControl('', [Validators.required]),
      customerMobile: new FormControl('', [Validators.required, Validators.min(10000000000), Validators.max(19999999999), Validators.pattern(/^[0-9]*$/)]),
      agree: new FormControl('', []),
    });

    // 保存渠道号
    this.reserveForm.get('gh').setValue(this.route.snapshot.queryParams['gh']);
    this.reserveForm.get('startJobTime').setValue('09:00');
    this.reserveForm.get('endJobTime').setValue('18:00');
    this.reserveForm.get('workDay').setValue('1, 2, 3, 4, 5, 6');

    this.route.paramMap.switchMap((params: ParamMap) => {
      this.reserveForm.get('type').setValue(0);
      this.reserveForm.get('housekeeperId').setValue(params.get('id'));
      return this.employeeSvc.getHousekeeper(params.get('id'));
    }).subscribe(res => {
      this.housekeeper = res.housekeeper;
      this.actionSheets['serviceAreaId'] = getServiceArea(this.housekeeper.serviceareaids, this.housekeeper.serviceareanames);
    });
  }

  onShow(target, exTarget?) {
    this.config.title = '请选择' + this.actionSheets[target].title;
    this.menus = this.actionSheets[target].data;
    this.actionSheet.show(this.menus, this.config).subscribe((res: any) => {
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
    this.reserveForm.get('workDay').setValue(workDays.toString());
  }

  onPickerShow(type: string, formControlName) {
    switch (type) {
      case 'date':
        this.picker.showDateTime(type).subscribe((res: any) => {
          const date = res.formatValue;
          this.reserveForm.get(formControlName).setValue(date);
        });
        break;
      case 'time':
        this.picker.showDateTime(type).subscribe((res: any) => {
          const time = res.formatValue;
          this.reserveForm.get(formControlName).setValue(time);
        });
        break;
    }
  }

  onSubmit() {
    this.isSubmit = true;

    const valid = validScroll(this.reserveForm.controls);

    if (!valid.valid) {// page_scroll_to_target
      const target = this.container.nativeElement.querySelector('.check-' + valid.control).offsetTop;
      let times = 1;
      try {
        const interval = setInterval(() => {
          this.container.nativeElement.scrollTop = this.container.nativeElement.scrollTop - (((this.container.nativeElement.scrollTop - target) / 320) * 16 * times);
          times = times + 1;
        }, 16);
        setTimeout(function () {
          clearInterval(interval);
        }, 320);
      } catch (err) {
        console.log(err);
      }
      return false;
    }

    this.logSvc._log('reserve', this.reserveForm.value).then(res => {
      console.log(res);
    });

    if (this.reserveForm.get('type').value === 0) {// 获取协议
      this.employeeSvc.reserveButler(this.reserveForm.value).then(res => {

        if (res.code === 0) {

          this.reserveForm.get('type').setValue(1);
          this.protocolShow = true;
          this.protocolContent = res.protocolContent;

        } else {
          this.dialog.show({
            title: '系统提示',
            content: res.msg
          }).subscribe(data => {
            console.log(data);
          });
        }
      });
    } else {// 提交订单
      if (!this.reserveForm.get('agree').value) {// 不同意用户协议
        this.dialog.show({
          title: '系统提示',
          content: '请阅读并勾选同意本协议!'
        }).subscribe(data => {
          console.log(data);
        });
        return false;
      } else {// 同意用户协议
        this.employeeSvc.reserveButler(this.reserveForm.value).then(res => {
          if (res.code === 0 || res.code === '0') {
            console.log(res);
            window.location.href = res.msg;
          } else {
            this.dialog.show({
              title: '系统提示',
              content: res.msg
            }).subscribe(data => {
              console.log(data);
            });
          }
        });
      }
    }
  }

  ngOnDestroy() {
    this.actionSheet.destroyAll();
    this.picker.destroy();
  }
}
