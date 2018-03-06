import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';
import {ToastService} from '../../../../services/toast.service';
import {DialogService} from '../../../../modules/dialog';
import {WxService} from '../../../../modules/wx';
import {getAddress} from '../../../../utils/utils';
import {PickerData, PickerConfig, PickerService} from 'ngx-weui';
import {DATA} from '../../../../utils/cn';

import {EmployeeService} from '../../../../services/employee.service';
import {LogService} from '../../../../services/log.service';

@Component({
  selector: 'app-front-resume-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class FrontResumePostComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  resumeForm: FormGroup;
  isSubmit: boolean = false;
  loading = false;

  cityData = DATA;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dialog: DialogService,
              private toast: ToastService,
              private wx: WxService,
              private picker: PickerService,
              private employeeSvc: EmployeeService,
              private logSvc: LogService) {
  }


  ngOnInit() {

    this.wx.config({
      title: '大牛管家诚聘优才',
      desc: '欢迎广大有志于高端管家助理服务的退伍军人，体育专业毕业生踊跃报名！',
      link: 'http://wap.danius.cn/front/resume/job',
      imgUrl: 'http://wap.danius.cn/assets/images/front/resume/share-icon.png'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      // this.status = '注册成功';
    }).catch((err: string) => {
      console.log(err);
      // this.status = `注册失败，原因：${err}`;
    });

    this.resumeForm = new FormGroup({
      registerType: new FormControl('', [Validators.required]),

      // 基本信息
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.min(10000000000), Validators.max(19999999999), Validators.pattern(/^[0-9]*$/)]),
      sex: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern(/^[0-9]*$/)]),
      birthday: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      weight: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      politicalClimate: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      nation: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      placeOfOrigin: new FormControl('', [Validators.required]),
      birthplace: new FormControl('', [Validators.required]),
      birthplaceType: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      address: new FormControl('', [Validators.required]),
      serverCity: new FormControl('', [Validators.required]),
      graduationPlace: new FormControl('', [Validators.required]), // registerType === 0
      graduationTime: new FormControl('', [Validators.required]), // registerType === 0
      major: new FormControl('', []),
      armyServePlace: new FormControl('', [Validators.required]), // registerType === 1
      enlistmentTime: new FormControl('', [Validators.required]), // registerType === 1
      retirementTime: new FormControl('', [Validators.required]), // registerType === 1
      services: new FormControl('', [Validators.required]), // registerType === 1
      militarySpecialty: new FormControl('', [Validators.required]), // registerType === 1
      retiredOfficerRank: new FormControl('', [Validators.required]), // registerType === 1
      drivingLicence: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      driversAge: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(2)]),

      // 社会工作经历
      workExperience: new FormControl('', []),

      // 体能指标
      pushUp: new FormControl('', [Validators.required]),
      pullUps: new FormControl('', [Validators.required]),
      sitUp: new FormControl('', [Validators.required]),
      hundredMDash: new FormControl('', [Validators.required]),
      thousandMin: new FormControl('', [Validators.required]),
      thousandSec: new FormControl('', [Validators.required]),
      thousandMDash: new FormControl('', [Validators.required]),

      // 其它
      specialty: new FormControl('', []),
      certificate: new FormControl('', []),
      infections: new FormControl('', [Validators.required]),
      userPromise: new FormControl('', [Validators.required]),

      gh: new FormControl('', []), // 下单渠道号
      referee: new FormControl('', []) // 推荐人
    });

    if (this.activatedRoute.snapshot.queryParams['gh']) { // 初始化下单渠道
      this.resumeForm.get('gh').setValue(this.activatedRoute.snapshot.queryParams['gh']);
    }

    if (this.activatedRoute.snapshot.queryParams['referee']) { // 初始化推荐人
      this.resumeForm.get('referee').setValue(this.activatedRoute.snapshot.queryParams['referee']);
    }

    this.resumeForm.get('thousandMin').valueChanges.subscribe(data => {
      if (this.resumeForm.get('thousandMin').valid && this.resumeForm.get('thousandSec').valid) {
        this.resumeForm.get('thousandMDash').setValue(this.resumeForm.get('thousandMin').value + '′' + this.resumeForm.get('thousandSec').value + '″');
      }
    });

    this.resumeForm.get('thousandSec').valueChanges.subscribe(data => {
      if (this.resumeForm.get('thousandMin').valid && this.resumeForm.get('thousandSec').valid) {
        this.resumeForm.get('thousandMDash').setValue(this.resumeForm.get('thousandMin').value + '′' + this.resumeForm.get('thousandSec').value + '″');
      }
    });

    this.resumeForm.get('registerType').valueChanges.subscribe(data => {
      if (data === '1') {
        this.resumeForm.get('armyServePlace').enable();
        this.resumeForm.get('enlistmentTime').enable();
        this.resumeForm.get('retirementTime').enable();
        this.resumeForm.get('services').enable();
        this.resumeForm.get('militarySpecialty').enable();
        this.resumeForm.get('retiredOfficerRank').enable();
        // this.resumeForm.get('certificate').enable();

        this.resumeForm.get('graduationPlace').disable();
        this.resumeForm.get('graduationTime').disable();
      } else {
        this.resumeForm.get('graduationPlace').enable();
        this.resumeForm.get('graduationTime').enable();

        this.resumeForm.get('armyServePlace').disable();
        this.resumeForm.get('enlistmentTime').disable();
        this.resumeForm.get('retirementTime').disable();
        this.resumeForm.get('services').disable();
        this.resumeForm.get('militarySpecialty').disable();
        this.resumeForm.get('retiredOfficerRank').disable();
        // this.resumeForm.get('certificate').disable();
      }
      this.resumeForm.updateValueAndValidity();
    });

    this.resumeForm.get('drivingLicence').valueChanges.subscribe(data => {
      if (data === '无') {
        this.resumeForm.get('driversAge').disable();
      } else {
        this.resumeForm.get('driversAge').enable();
      }
    });
  }

  onPickerShow(type: string, formControlName) {
    switch (type) {
      case 'city':
        this.picker.showCity(this.cityData).subscribe((res: any) => {
          // this.resumeForm.get(formControlName).setValue(getAddress(res.items));
          if (formControlName === 'placeOfOrigin') {
            this.resumeForm.get(formControlName).setValue(getAddress([res.items[0], res.items[1]]));
          } else {
            this.resumeForm.get(formControlName).setValue(getAddress(res.items));
          }
        });
        break;
      case 'date':
        this.picker.showDateTime(type).subscribe((res: any) => {
          this.resumeForm.get(formControlName).setValue(res.formatValue);
        });
        break;
    }
  }

  onSubmit(form) {
    this.isSubmit = true;
    if (this.resumeForm.invalid) {
      return false;
    }
    this.logSvc._log('resume', this.resumeForm.value).then(res => {
      console.log(res);
    });
    this.loading = true;
    this.employeeSvc.resume(this.resumeForm.value).then(res => {
      this.loading = false;
      this.dialog.show({title: '系统提示', content: res.msg}).subscribe(data => {
        if (data === 'confirm' && res.code === 0) {
          this.router.navigate(['/front/resume/job'], {queryParamsHandling: 'merge'});
        }
      });
    });
  }

}
