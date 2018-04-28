import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ActivatedRoute, ParamMap} from '@angular/router';
import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {WxService} from '../../../../../modules/wx';
import {EmployeeService} from '../../../../../services/employee.service';

import {PickerService, DialogService, ActionSheetService, ActionSheetConfig} from 'ngx-weui';

import {LogService} from '../../../../../services/log.service';
import {getIndex, validScroll} from '../../../../../utils/utils';
import {Config} from '../../../../../config';

declare var $: any;

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

  isSubmit: boolean = false;
  protocolShow: boolean = false;
  protocolContent;

  housekeeper;

  loading = false;

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
      housekeeperId: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      customerMobile: new FormControl('', [Validators.required, Validators.min(10000000000), Validators.max(19999999999), Validators.pattern(/^[0-9]*$/)]),
      serviceAreaId: new FormControl('', []),
      successUrl: new FormControl('', [Validators.required])
    });

    // 保存渠道号
    this.reserveForm.get('gh').setValue(this.route.snapshot.queryParams['gh']);
    this.reserveForm.get('serviceAreaId').setValue(this.route.snapshot.queryParams['city']);
    this.reserveForm.get('successUrl').setValue(Config.webHost + '/front/msg/reserve');

    this.route.paramMap.switchMap((params: ParamMap) => {
      this.reserveForm.get('housekeeperId').setValue(params.get('id'));
      return this.employeeSvc.getHousekeeper(params.get('id'));
    }).subscribe(res => {
      this.housekeeper = res.housekeeper;
    });
  }

  onSubmit() {
    this.isSubmit = true;
    if (this.loading) {
      return false;
    }
    const valid = validScroll(this.reserveForm.controls);

    if (!valid.valid) {// page_scroll_to_target
      return false;
    }

    this.loading = true;

    this.logSvc._log('reserve', this.reserveForm.value).then(res => {
      console.log(res);
    });

    this.employeeSvc.reserveButler(this.reserveForm.value).then(res => {
      this.loading = false;
      if (res.code === 0 || res.code === '0') {
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

  ngOnDestroy() {
    this.actionSheet.destroyAll();
    this.picker.destroy();
  }
}
