import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {TraineeService} from '../../../../../services/backend/trainee.service';
import {TermService} from '../../../../../services/backend/term.service';
import {PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-resume-turn',
  templateUrl: './turn.component.html',
  styleUrls: ['./turn.component.scss']
})
export class AdminBackendResumeTurnComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  pickerData = {
    term: {
      selected: '请选择',
      data: []
    },
    course: {
      selected: '请选择',
      data: []
    }
  };

  user: any;

  trainee;
  params = {
    type: '2',
    id: ''
  };

  turnForm: FormGroup;
  isSubmit = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private picker: PickerService,
              private userSvc: UserService,
              private traineeSvc: TraineeService,
              private termSvc: TermService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.params.type = this.route.snapshot.queryParams['type'];

    this.turnForm = new FormGroup({
      custId: new FormControl('', [Validators.required]),
      traineeId: new FormControl('', [Validators.required]),
      status: new FormControl('', [Validators.required]),
      reason: new FormControl('', []),
      termid: new FormControl('', [Validators.required]),
      termname: new FormControl('', [Validators.required]),
      type: new FormControl('', [Validators.required]),
      studentNumber: new FormControl('', [Validators.required]),
      trcoursetypeid: new FormControl('', [Validators.required])
    });

    this.turnForm.get('custId').setValue(this.user.id);
    this.turnForm.get('traineeId').setValue(this.route.snapshot.params['id']);
    this.turnForm.get('status').setValue(this.route.snapshot.queryParams['status']);
    this.turnForm.get('reason').setValue(this.route.snapshot.queryParams['reason']);
    if (this.params.type === '1') {
      this.turnForm.get('type').setValue('3');
    }
    if (this.params.type === '2') {
      this.turnForm.get('type').setValue('0');
    }

    this.params.id = this.route.snapshot.params['id'];

    this.termSvc.getCourseTypeList().then(res => {
      res.list.forEach(item => {
        this.pickerData.course.data.push({
          label: item.typename,
          value: item.coursetypeid
        });
      });
    });

    this.termSvc.getTermList().then(res => {
      res.list.forEach(item => {
        this.pickerData.term.data.push({
          label: item.termname,
          value: item.termid,
          date: item.remark
        });
      });
    });

    this.traineeSvc.getRegInfo(this.params).then(res => {
      if (this.params.type === '1') {
        this.trainee = res.common;
      }
      if (this.params.type === '2') {
        this.trainee = res.soldier;
      }
    });

  }

  showPicker(type) {
    if (type === 'term') {
      const data = this.pickerData['term'].data;
      this.picker.show([data], [], [], {cancel: '取消', confirm: '确定'}).subscribe(res => {
        this.pickerData['term'].selected = res.items[0].label;
        this.turnForm.get('termname').setValue(res.items[0].label);
        this.turnForm.get('termid').setValue(res.value);

        this.termSvc.getSeqNo(res.items[0].date).then(_res => {
          this.turnForm.get('studentNumber').setValue(_res.seq);
        });
      });
    }
    if (type === 'course') {
      const data = this.pickerData['course'].data;
      this.picker.show([data], [], [], {cancel: '取消', confirm: '确定'}).subscribe(res => {
        this.pickerData['course'].selected = res.items[0].label;
        this.turnForm.get('trcoursetypeid').setValue(res.value);
      });
    }
  }

  submit() {
    this.isSubmit = true;
    if (this.turnForm.invalid) {
      return false;
    }


    this.traineeSvc.turnTrainee(this.turnForm.value).then(res => {
      if (res === 0) {
        return false;
      }
      if (this.params.type === '1') {
        this.router.navigate(['/admin/backend/resume/item/tys', this.params.id], {});
      }
      if (this.params.type === '2') {
        this.router.navigate(['/admin/backend/resume/item/twb', this.params.id], {});
      }
    });
  }
}
