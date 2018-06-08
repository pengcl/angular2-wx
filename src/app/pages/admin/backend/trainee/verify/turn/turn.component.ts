import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';
import {DialogService, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-trainee-verify-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss']
})
export class AdminBackendTraineeVerifyTurnComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;

  trainee;
  params = {
    id: ''
  };

  pickerData = {
    selected: '请选择',
    data: []
  };

  selectedData = {
    expertise: [],
    serviceArea: []
  };

  expertises;
  serviceAreas;
  levels;

  turnForm: FormGroup;
  isSubmit = false;
  isLoading = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private dialog: DialogService,
              private picker: PickerService,
              private userSvc: UserService,
              private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.params.id = this.route.snapshot.params['id'];

    this.turnForm = new FormGroup({
      traineeId: new FormControl('', [Validators.required]),
      toApply: new FormControl('', [Validators.required]),
      remark: new FormControl('', [Validators.required]),

      levelId: new FormControl('', [Validators.required]),
      levelName: new FormControl('', [Validators.required]),
      expertiseIds: new FormControl('', [Validators.required]),
      expertiseNames: new FormControl('', [Validators.required]),
      /*serviceAreaIds: new FormControl('', [Validators.required]),
      serviceAreaNames: new FormControl('', [Validators.required]),*/
      commissionamount: new FormControl('', [Validators.required]),
      monthlypay: new FormControl('', [Validators.required]),
      servicetime: new FormControl('', [Validators.required])
    });

    this.turnForm.get('traineeId').setValue(this.params.id);

    this.turnForm.get('toApply').valueChanges.subscribe(value => {
      if (value === '3') {
        this.turnForm.get('remark').enable();

        this.turnForm.get('levelId').disable();
        this.turnForm.get('levelName').disable();
        this.turnForm.get('expertiseIds').disable();
        this.turnForm.get('expertiseNames').disable();
        /*this.turnForm.get('serviceAreaIds').disable();
        this.turnForm.get('serviceAreaNames').disable();*/
        this.turnForm.get('commissionamount').disable();
        this.turnForm.get('monthlypay').disable();
        this.turnForm.get('servicetime').disable();
      } else {
        this.turnForm.get('remark').disable();

        this.turnForm.get('levelId').enable();
        this.turnForm.get('levelName').enable();
        this.turnForm.get('expertiseIds').enable();
        this.turnForm.get('expertiseNames').enable();
        /*this.turnForm.get('serviceAreaIds').enable();
        this.turnForm.get('serviceAreaNames').enable();*/
        this.turnForm.get('commissionamount').enable();
        this.turnForm.get('monthlypay').enable();
        this.turnForm.get('servicetime').enable();
      }
      this.turnForm.updateValueAndValidity();
    });

    this.traineeSvc.getTrainee(this.params.id).then(res => {
      this.trainee = res.trainee;
    });

    this.traineeSvc.getExpertiseList().then(res => {
      const expertises = [];
      res.list.forEach(item => {
        item.selected = false;
        expertises.push(item);
      });
      this.expertises = expertises;
    });

    this.traineeSvc.getServiceAreaList().then(res => {
      const serviceAreas = [];
      res.list.forEach(item => {
        item.selected = false;
        serviceAreas.push(item);
      });
      this.serviceAreas = serviceAreas;
    });

    this.traineeSvc.getLevelList().then(res => {
      this.levels = res.list;
      res.list.forEach(item => {
        this.pickerData.data.push({
          label: item.levelname,
          value: item.levelid
        });
      });
    });
  }

  pickerShow() {
    this.picker.show([this.pickerData.data], [], [], {cancel: '取消', confirm: '确定'}).subscribe(res => {
      this.turnForm.get('levelId').setValue(res.items[0].value);
      this.turnForm.get('levelName').setValue(res.items[0].label);
    });
  }

  onSelected(target, i) {
    this[target + 's'][i].selected = !this[target + 's'][i].selected;
    const ids = [];
    const names = [];
    this[target + 's'].forEach(item => {
      if (item.selected) {
        if (target === 'expertise') {
          ids.push(item[target.toLowerCase() + 'id']);
          names.push(item[target.toLowerCase() + 'name']);
        } else {
          ids.push(item['areaid']);
          names.push(item['areaname']);
        }
      }
    });
    this.turnForm.get(target + 'Ids').setValue(ids);
    this.turnForm.get(target + 'Names').setValue(names);
  }

  toApply(type) {
    this.turnForm.get('toApply').setValue(type);
  }

  turn() {
    console.log(this.turnForm);
    if (this.isLoading) {
      return false;
    }
    this.isSubmit = true;
    if (this.turnForm.invalid) {
      return false;
    }

    this.traineeSvc.toHousekeeper(this.turnForm.value).then(res => {
      if (res.code === 0) {
        window.history.back();
      }
    });


    /*this.dialog.show({
      title: '申请管家审批',
      content: '学员姓名：' + this.trainee.name,
      cancel: '不通过',
      confirm: '通过'
    }).subscribe(data => {
      if (data.value) {
        this.traineeSvc.turnHousekeeper(this.params.id).then(res => {
          if (res.code === 0) {
            this.dialog.show({
              title: '',
              content: '成功提交申请',
              cancel: '',
              confirm: '确定'
            }).subscribe(_data => {
              if (_data.value) {
                this.router.navigate(['/admin/backend/trainee/list'], {});
              }
            });
          }
        });
      }
    });*/
  }

  back() {
    window.history.back();
  }
}
