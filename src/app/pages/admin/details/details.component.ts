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

  userId: string;
  user: any;

  actionSheets = ACTIONSHEETS;
  srvRes: any = '';
  cityData: any = DATA;

  menus: any[];
  extraShow: boolean = false;
  isSubmit: boolean = false;

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
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }
    this.reserveForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      housekeeperCustId: new FormControl('', [Validators.required]),
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
      agree: new FormControl('', [Validators.required]),
    });

    this.route.paramMap.switchMap((params: ParamMap) => {
      this.reserveForm.get('custId').setValue('10000098020359');
      this.reserveForm.get('housekeeperCustId').setValue(params.get('id'));
      return this.butlerSvc.getHousekeeper(+params.get('id'));
    }).subscribe(housekeeper => {
      const body = JSON.parse((JSON.parse(housekeeper)).msg);
      this.actionSheets['serviceAreaId'] = getServiceArea(body.serviceareaids, body.serviceareanames);
      console.log(this.actionSheets['serviceAreaId']);
      this.housekeeper = body;
    });
  }

  onShow(target, exTarget) {
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
    if (this.reserveForm.valid) {
      this.butlerSvc.reserveButler(this.reserveForm.value).then(result => {
        result = JSON.parse(result);
        this.dialog.show({
          title: '系统提示',
          content: result.msg
        }).subscribe(res => {
          console.log(res);
        });
      });
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
