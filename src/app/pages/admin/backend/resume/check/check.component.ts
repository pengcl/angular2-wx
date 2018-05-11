import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {PickerService} from 'ngx-weui';
import {TraineeService} from '../../../../../services/backend/trainee.service';

@Component({
  selector: 'app-admin-backend-resume-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class AdminBackendResumeCheckComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  pickerData = {
    status: {
      selected: '请选择',
      data: [
        {
          label: '考核不通过',
          value: 'khbtg'
        },
        {
          label: '考核通过，转成学员',
          value: 'khtgzcxy'
        },
        {
          label: '不来报到',
          value: 'blbd'
        }
      ]
    }
  };

  user: any;

  trainee;
  params = {
    type: '2',
    id: ''
  };

  checkForm: FormGroup;
  isSubmit = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private userSvc: UserService,
              private picker: PickerService,
              private traineeSvc: TraineeService,
  ) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.checkForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      traineeId: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      reason: new FormControl('', [])
    });

    this.params.id = this.route.snapshot.params['id'];
    this.params.type = this.route.snapshot.queryParams['type'];

    this.checkForm.get('custId').setValue(this.user.id);
    this.checkForm.get('traineeId').setValue(this.params.id);
    this.traineeSvc.getRegInfo(this.params).then(res => {
      if (this.params.type === '1') {
        this.trainee = res.common;
      }
      if (this.params.type === '2') {
        this.trainee = res.soldier;
      }
    });
  }

  showPicker(target) {
    const data = this.pickerData[target].data;
    this.picker.show([data], [], [], {cancel: '取消', confirm: '确定'}).subscribe(res => {
      this.pickerData[target].selected = res.items[0].label;
      this.checkForm.get(target).setValue(res.value);
    });
  }

  turn() {
    this.isSubmit = true;
    if (this.checkForm.invalid) {
      return false;
    }
    if (this.checkForm.get('status').value === 'khtgzcxy') {
      this.router.navigate(['/admin/backend/resume/turn', this.params.id], {
        queryParams: {
          type: this.params.type,
          status: this.checkForm.get('status').value,
          reason: this.checkForm.get('reason').value
        }
      });
    } else {
      this.traineeSvc.turnTrainee(this.checkForm.value).then(res => {
        console.log(res);
        window.history.back();
      });
    }
  }
}
