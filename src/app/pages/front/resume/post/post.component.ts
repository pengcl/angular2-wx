import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, NavigationExtras, ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {getAddress, validScroll} from '../../../../utils/utils';
import {PickerService, DialogService, ActionSheetService, ActionSheetConfig} from 'ngx-weui';
import {DATA} from '../../../../utils/cn';

import {EmployeeService} from '../../../../services/employee.service';
import {LogService} from '../../../../services/log.service';

import {getIndex} from '../../../../utils/utils';

@Component({
  selector: 'app-front-resume-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class FrontResumePostComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  @ViewChild('scrollMe') private container: any;

  resumeForm: FormGroup;
  isSubmit: boolean = false;
  loading = false;

  cityData = DATA;

  config: ActionSheetConfig = <ActionSheetConfig>{
    backdrop: true
  };

  /*servicesData = [
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
    ],
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
  ];*/

  menus: any[];
  actionSheets = {
    sex: {
      type: 'sex',
      title: '性别',
      selected: '请选择',
      data: [
        {
          text: '男',
          value: 1
        },
        {
          text: '女',
          value: 0
        }
      ]
    },
    isMarried: {
      type: 'isMarried',
      title: '婚姻情况',
      selected: '请选择',
      data: [
        {
          text: '未婚',
          value: 1
        },
        {
          text: '已婚',
          value: 2
        }
      ]
    },
    politicalClimate: {
      type: 'politicalClimate',
      title: '政治面貌',
      selected: '请选择',
      data: [
        {
          text: '群众',
          value: 0
        },
        {
          text: '共青团员',
          value: 2
        },
        {
          text: '共产党员(含预备)',
          value: 1
        },
        {
          text: '民主党派',
          value: 3
        },
        {
          text: '无党派人士',
          value: 4
        }
      ]
    },
    education: {
      type: 'education',
      title: '学历',
      selected: '请选择',
      data: [
        {
          text: '初中',
          value: 0
        },
        {
          text: '高中',
          value: 1
        },
        {
          text: '中专',
          value: 2
        },
        {
          text: '大专',
          value: 3
        },
        {
          text: '本科',
          value: 4
        },
        {
          text: '硕士',
          value: 5
        },
        {
          text: '博士',
          value: 6
        },
        {
          text: 'MBA',
          value: 7
        },
        {
          text: 'EMBA',
          value: 8
        },
        {
          text: '其它',
          value: 9
        }
      ]
    },
    birthplaceType: {
      type: 'birthplaceType',
      title: '户口性质',
      selected: '请选择',
      data: [
        {
          text: '城镇',
          value: 0
        },
        {
          text: '农村',
          value: 1
        }
      ]
    },
    serverCity: {
      type: 'serverCity',
      title: '意向城市',
      selected: '请选择',
      data: [
        {
          text: '北京',
          value: '北京'
        },
        {
          text: '上海',
          value: '上海'
        },
        {
          text: '广州',
          value: '广州'
        },
        {
          text: '深圳',
          value: '深圳'
        },
        {
          text: '杭州',
          value: '杭州'
        }
      ]
    },
    movementType: {
      type: 'movementType',
      title: '运动类型',
      selected: '请选择',
      data: [
        {
          text: '武术',
          value: '武术'
        },
        {
          text: '健身',
          value: '健身'
        },
        {
          text: '运动康复',
          value: '运动康复'
        },
        {
          text: '其他',
          value: '其他'
        }
      ]
    },
    isSpecialArms: {
      type: 'isSpecialArms',
      title: '是否特种兵',
      selected: '请选择',
      data: [
        {
          text: '是',
          value: 2
        },
        {
          text: '否',
          value: 1
        }
      ]
    },
    drivingLicence: {
      type: 'drivingLicence',
      title: '驾照类型',
      selected: '请选择',
      data: [
        {
          text: 'A1',
          value: 'A1'
        },
        {
          text: 'A2',
          value: 'A2'
        },
        {
          text: 'A3',
          value: 'A3'
        },
        {
          text: 'B1',
          value: 'B1'
        },
        {
          text: 'B2',
          value: 'B2'
        },
        {
          text: 'C1',
          value: 'C1'
        },
        {
          text: 'C2',
          value: 'C2'
        },
        {
          text: '无',
          value: 0
        }
      ]
    },
    certificate: {
      type: 'certificate',
      title: '立功授奖',
      selected: '请选择',
      data: [
        {
          text: '无',
          value: '无'
        },
        {
          text: '嘉奖',
          value: '嘉奖'
        },
        {
          text: '三等功',
          value: '三等功'
        },
        {
          text: '二等功',
          value: '二等功'
        },
        {
          text: '一等功',
          value: '一等功'
        },
        {
          text: '荣誉称号',
          value: '荣誉称号'
        }
      ]
    },
    infections: {
      type: 'infections',
      title: '身体状况',
      selected: '请选择',
      data: [
        {
          text: '身体健康,无传染性、精神性或其它器质性疾病',
          value: 0
        },
        {
          text: '有传染性、精神性或其它器质性疾病',
          value: 1
        }
      ]
    },
    armyType: {
      type: 'armyType',
      title: '军种',
      selected: '请选择',
      data: [
        {
          text: '陆军',
          value: '0'
        },
        {
          text: '海军',
          value: '1'
        },
        {
          text: '空军',
          value: '2'
        },
        {
          text: '火箭军',
          value: '3'
        },
        {
          text: '战略支援部队',
          value: '4'
        },
        {
          text: '武装警察',
          value: '5'
        }
      ]
    },
    services: {
      type: 'services',
      title: '兵种',
      selected: '请选择',
      data: [
        [
          {
            text: '步兵',
            value: '步兵'
          },
          {
            text: '侦察兵',
            value: '侦察兵'
          },
          {
            text: '装甲兵',
            value: '装甲兵'
          },
          {
            text: '炮兵',
            value: '炮兵'
          },
          {
            text: '防空兵',
            value: '防空兵'
          },
          {
            text: '陆军航空兵',
            value: '陆军航空兵'
          },
          {
            text: '工程兵',
            value: '工程兵'
          },
          {
            text: '通信兵',
            value: '通信兵'
          },
          {
            text: '防化兵',
            value: '防化兵'
          },
          {
            text: '电子对抗兵',
            value: '电子对抗兵'
          },
          {
            text: '特种兵',
            value: '特种兵'
          }
        ],
        [
          {
            text: '水面舰艇部队',
            value: '水面舰艇部队'
          },
          {
            text: '潜艇部队',
            value: '潜艇部队'
          },
          {
            text: '海军航空兵',
            value: '海军航空兵'
          },
          {
            text: '海军岸防部队',
            value: '海军岸防部队'
          },
          {
            text: '海军陆战队',
            value: '海军陆战队'
          }
        ],
        [
          {
            text: '空军航空兵',
            value: '空军航空兵'
          },
          {
            text: '地空导弹兵',
            value: '地空导弹兵'
          },
          {
            text: '高射炮兵',
            value: '高射炮兵'
          },
          {
            text: '雷达兵',
            value: '雷达兵'
          },
          {
            text: '电子对抗兵',
            value: '电子对抗兵'
          },
          {
            text: '空降兵',
            value: '空降兵'
          }
        ],
        [
          {
            text: '导弹兵',
            value: '导弹兵'
          },
          {
            text: '其它保障部队',
            value: '其它保障部队'
          }
        ],
        [
          {
            text: '网络部队',
            value: '网络部队'
          },
          {
            text: '航天部队',
            value: '航天部队'
          },
          {
            text: '保障部队',
            value: '保障部队'
          }
        ],
        [
          {
            text: '内卫部队',
            value: '内卫部队'
          },
          {
            text: '警卫部队',
            value: '警卫部队'
          },
          {
            text: '边防部队',
            value: '边防部队'
          },
          {
            text: '消防部队',
            value: '消防部队'
          },
          {
            text: '黄金部队',
            value: '黄金部队'
          },
          {
            text: '水电部队',
            value: '水电部队'
          },
          {
            text: '交通部队',
            value: '交通部队'
          },
          {
            text: '森林部队',
            value: '森林部队'
          }
        ]
      ]
    }
  };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private actionSheet: ActionSheetService,
              private dialog: DialogService,
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
      // isMarried: new FormControl('', [Validators.required]),
      birthday: new FormControl('', [Validators.required]),
      height: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      weight: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      politicalClimate: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      // nation: new FormControl('', [Validators.required]),
      education: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      // placeOfOrigin: new FormControl('', [Validators.required]),
      // birthplace: new FormControl('', [Validators.required]),
      // birthplaceType: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/)]),
      address: new FormControl('', [Validators.required]),
      serverCity: new FormControl('', [Validators.required]),
      graduationPlace: new FormControl('', [Validators.required]), // registerType === 0
      graduationTime: new FormControl('', [Validators.required]), // registerType === 0
      movementType: new FormControl('', [Validators.required]), // registerType === 0
      // major: new FormControl('', []),
      // armyServePlace: new FormControl('', [Validators.required]), // registerType === 1
      enlistmentTime: new FormControl('', [Validators.required]), // registerType === 1
      retirementTime: new FormControl('', [Validators.required]), // registerType === 1
      // armyType: new FormControl('', [Validators.required]), // registerType === 1
      // services: new FormControl('', [Validators.required]), // registerType === 1
      // isSpecialArms: new FormControl('', [Validators.required]), // registerType === 1
      // militarySpecialty: new FormControl('', [Validators.required]), // registerType === 1
      // retiredOfficerRank: new FormControl('', [Validators.required]), // registerType === 1
      drivingLicence: new FormControl('', [Validators.required, Validators.maxLength(2)]),
      driversAge: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]*$/), Validators.maxLength(2)]),
      drivingMileage: new FormControl('', [Validators.required, Validators.min(0), Validators.max(999999)]),

      // 社会工作经历
      workExperience: new FormControl('', []),

      // 体能指标
      pushUp: new FormControl('', [Validators.required]),
      standingLongJump: new FormControl('', [Validators.required, Validators.min(1), Validators.max(1000)]),
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
      userPromise: new FormControl('', [Validators.required, Validators.requiredTrue]),

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
        // this.resumeForm.get('armyServePlace').enable();
        this.resumeForm.get('enlistmentTime').enable();
        this.resumeForm.get('retirementTime').enable();
        // this.resumeForm.get('services').enable();
        // this.resumeForm.get('armyType').enable();
        // this.resumeForm.get('militarySpecialty').enable();
        // this.resumeForm.get('retiredOfficerRank').enable();
        // this.resumeForm.get('isSpecialArms').enable();

        this.resumeForm.get('graduationPlace').disable();
        this.resumeForm.get('graduationTime').disable();
        this.resumeForm.get('movementType').disable();
      } else {
        this.resumeForm.get('graduationPlace').enable();
        this.resumeForm.get('graduationTime').enable();
        this.resumeForm.get('movementType').enable();

        // this.resumeForm.get('armyServePlace').disable();
        this.resumeForm.get('enlistmentTime').disable();
        this.resumeForm.get('retirementTime').disable();
        // this.resumeForm.get('services').disable();
        // this.resumeForm.get('armyType').disable();
        // this.resumeForm.get('militarySpecialty').disable();
        // this.resumeForm.get('retiredOfficerRank').disable();
        // this.resumeForm.get('isSpecialArms').disable();
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

  onShow(target, exTarget?) {
    this.config.title = '请选择' + this.actionSheets[target].title;
    this.menus = this.actionSheets[target].data;
    this.actionSheet.show(this.menus, this.config).subscribe((res: any) => {
      this.resumeForm.get(target).setValue(res.value);
      this.actionSheets[target].selected = res.text;
      if (exTarget) {
        this.resumeForm.get(exTarget).setValue(res.text);
      }
    });
  }

  onServices(target) {
    this.config.title = '请选择' + this.actionSheets[target].title;
    this.menus = this.actionSheets[target].data;
    if (target === 'services') {
      const index = getIndex(this.actionSheets['armyType'].data, 'text', this.resumeForm.get('armyType').value);
      const menus = this.actionSheets[target].data[index];
      this.actionSheet.show(menus, this.config).subscribe((res: any) => {
        this.resumeForm.get(target).setValue(res.text);
        this.actionSheets[target].selected = res.text;
      });
    } else {
      this.actionSheet.show(this.menus, this.config).subscribe((res: any) => {
        this.resumeForm.get(target).setValue(res.text);
        this.actionSheets[target].selected = res.text;
        this.resumeForm.get('services').setValue('');
        this.actionSheets['services'].selected = '请选择';
      });
    }
  }

  onPickerShow(type: string, formControlName, data?) {
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
      case 'date-ym':
        this.picker.showDateTime(type).subscribe((res: any) => {
          this.resumeForm.get(formControlName).setValue(res.formatValue);
        });
        break;
      case 'data':
        this.picker.show(data, {}, [], {confirm: '确定'}).subscribe((res: any) => {
          this.resumeForm.get(formControlName).setValue(res.formatValue);
        });
        break;
    }
  }

  onSubmit(form) {
    this.isSubmit = true;

    const valid = validScroll(this.resumeForm.controls);

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

    if (this.resumeForm.invalid || this.loading) {
      return false;
    }
    this.logSvc._log('resume', this.resumeForm.value).then(res => {
      console.log(res);
    });
    this.loading = true;
    this.employeeSvc.resume(this.resumeForm.value).then(res => {
      this.loading = false;
      this.dialog.show({title: '系统提示', content: res.msg, cancel: '', confirm: '我知道了'}).subscribe(data => {
        if (data.value && res.code === 0) {
          this.router.navigate(['/front/resume/job'], {queryParamsHandling: 'merge'});
        }
      });
    });
  }

}
