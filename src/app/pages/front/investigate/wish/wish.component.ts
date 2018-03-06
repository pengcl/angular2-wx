import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {PageConfig} from '../../../page.config';
import {WxService} from '../../../../modules/wx';
import {EmployerService} from '../../../../services/employer.service';
import {DialogService} from '../../../../modules/dialog';

@Component({
  selector: 'app-front-investigate-wish',
  templateUrl: './wish.component.html',
  styleUrls: ['./wish.component.scss']
})
export class FrontInvestigateWishComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  wishForm: FormGroup;
  isSubmit = false;

  constructor(private activeRouter: ActivatedRoute,
              private router: Router,
              private wxService: WxService,
              private dialog: DialogService,
              private employer: EmployerService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家需求调查';
  }


  ngOnInit() {
    this.wxService.config({}).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });

    this.wishForm = new FormGroup({
      id: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required, Validators.min(10000000000), Validators.max(19999999999), Validators.pattern(/^[0-9]*$/)]),
      wish: new FormControl('', [Validators.required])
    });
    this.wishForm.get('id').setValue(this.activeRouter.snapshot.paramMap.get('id'));
  }

  select(formControlName, value) {
    this.wishForm.get(formControlName).setValue(value);
  }

  onSubmit() {
    console.log(this.wishForm);
    this.isSubmit = true;
    if (this.wishForm.invalid) {
      return false;
    } else {
      this.employer.updateInvestigate(this.wishForm.value).then(res => {
        console.log(res);
        if (res.code === 0) {
          if (this.wishForm.get('wish').value === '1') {
            window.location.href = 'http://pay.danius.cn/interface/payment/gotoPay.ht?orderNo=' + res.orderNo;
          } else {
            this.router.navigate(['/front/investigate/success'], {});
          }
        } else {
          this.dialog.show({
            content: res.msg
          }).subscribe(data => {
            console.log(data);
          });
        }
      });
    }
  }

}
