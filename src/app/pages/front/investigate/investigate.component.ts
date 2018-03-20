import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors} from '@angular/forms';

import {PageConfig} from '../../page.config';
import {WxService} from '../../../modules/wx';
import {removeByIndex} from '../../../utils/utils';
import {EmployerService} from '../../../services/employer.service';
import {Router} from '@angular/router';

import {validScroll} from '../../../utils/utils';
import {DialogService} from 'ngx-weui';

declare var $: any;

export class MyValidators {
  static checkMobile(value: string): ValidationErrors | null {
    const arr = value.split(',');
    return !(arr[0] && arr[1]) ? {mobile: {msg: '手机号必须是159开头'}} : null;
  }
}


function validateDbSelect(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    // 获取当前控件的内容
    const arr = control.value.split(',');
    if (arr[0] && arr[1]) {
      return null;
    } else {
      return {dbSelect: false};
    }
  };
}

@Component({
  selector: 'app-front-investigate',
  templateUrl: './investigate.component.html',
  styleUrls: ['./investigate.component.scss']
})
export class FrontInvestigateComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  investigateForm: FormGroup;

  @ViewChild('scrollMe') private container: any;

  isSubmit = false;

  requirement = ['', ''];

  constructor(private router: Router,
              private wxService: WxService,
              private employer: EmployerService,
              private dialog: DialogService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家需求调查';
  }


  ngOnInit() {
    this.wxService.config({}).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });

    this.investigateForm = new FormGroup({
      city: new FormControl('', [Validators.required]),
      todo: new FormControl('', [Validators.required]),
      requirement: new FormControl('', [Validators.required, validateDbSelect()]),
      skill: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      character: new FormControl('', [Validators.required]),
      marriage: new FormControl('', [Validators.required]),
      budget: new FormControl('', [Validators.required])
    });
  }

  select(formControlName, value) {
    this.investigateForm.get(formControlName).setValue(value);
  }

  selects(formControlName, value) {
    let _value;
    if (!!this.investigateForm.get(formControlName).value) {
      _value = this.investigateForm.get(formControlName).value.split(',');
    } else {
      _value = [];
    }
    if (_value.indexOf(value) === -1) {
      _value.push(value);
      this.investigateForm.get(formControlName).setValue(_value.toString());
    } else {
      _value = removeByIndex(_value, _value.indexOf(value));
      this.investigateForm.get(formControlName).setValue(_value.toString());
    }
  }

  dbSelect(formControlName, value) {
    this.requirement = value;
    this.investigateForm.get(formControlName).setValue(value.toString());
  }

  onSubmit() {
    this.isSubmit = true;
    const valid = validScroll(this.investigateForm.controls);

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
    } else {
      this.employer.investigate(this.investigateForm.value).then(res => {
        if (res.code !== 0) {
          this.dialog.show({
            content: res.msg
          }).subscribe(data => {
            console.log(data);
          });
          return false;
        }
        this.router.navigate(['/front/investigate/wish', res.id], {});
      });
    }
  }

}
