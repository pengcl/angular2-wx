import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {PageConfig} from './page.config';
import {WXService} from '../../../services/wx.service';
import {UserService} from '../../../services/user.service';
import {ButlerService} from '../../../services/butler.service';
import {ActionSheetService, ActionSheetConfig} from '../../../components/actionsheet';

import {ACTIONSHEETS} from '../../../../mockData/actionSheets';
import {PickerService} from '../../../modules/picker';

import {DATA} from './city';

declare var $: any;

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

  items: string[] = Array(6).fill('').map((v: string, idx: number) => `Item${idx}`);
  itemGroup: any = [
    [
      {
        label: 'Item1',
        value: 1
      },
      {
        label: 'Item2 (Disabled)',
        disabled: true,
        value: 2
      },
      {
        label: 'Item3',
        value: 3
      },
      {
        label: 'Item4',
        value: 4
      },
      {
        label: 'Item5',
        value: 5
      }
    ]
  ];

  config: ActionSheetConfig = <ActionSheetConfig>{
    backdrop: true
  };

  constructor(private datePipe: DatePipe, private wx: WXService, private userSvc: UserService, private butlerSvc: ButlerService, private actionSheet: ActionSheetService, private picker: PickerService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }
    this.reserveForm = new FormGroup({
      housekeeperId: new FormControl('', [Validators.required]),
      customerName: new FormControl('', [Validators.required]),
      customerMobile: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
      serviceStartDate: new FormControl('', [Validators.required]),
      servicePeriod: new FormControl('', [Validators.required]),
      workTypeIds: new FormControl('', [Validators.required]),
      serviceAreaId: new FormControl('', [Validators.required]),
      startJobTime: new FormControl('', [Validators.required]),
      endJobTime: new FormControl('', [Validators.required]),
      workDay: new FormControl('', [Validators.required]),
      // restDay: new FormControl('', [Validators.required]),
      attendanceNotes: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      detailed: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      agree: new FormControl('', [Validators.required]),
    });
    this.reserveForm.get('housekeeperId').setValue('10000096020354');

    this.butlerSvc.getHousekeeper('10000096020354').then(result => {
      console.log(result);
    });
  }

  onShow(target) {
    this.config.title = '请选择' + this.actionSheets[target].title;
    this.menus = this.actionSheets[target].data;
    this.actionSheet.show(this.menus, this.config).subscribe((res: any) => {
      console.log(res);
      this.reserveForm.get(target).setValue(res.value);
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
    console.log(this.reserveForm);
    console.log(this.reserveForm.valid);
    if (this.reserveForm.valid) {
      this.butlerSvc.reserveButler(this.reserveForm.value).then(result => {
        console.log(result);
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
          const date = this.datePipe.transform(res.value, 'yyyy/MM/dd');
          this.reserveForm.get(formControlName).setValue(date);
          this.srvRes = date;
        });
        break;
      /*case 'datetime':
        this.picker.showDateTime(type).subscribe((res: any) => {
          this.srvRes = res.value;
        });
        break;*/
      case 'time':
        this.picker.showDateTime(type).subscribe((res: any) => {
          const date = this.datePipe.transform(res.value, 'hh:mm');
          this.reserveForm.get(formControlName).setValue(date);
          this.srvRes = date;
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
