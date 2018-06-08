import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {PickerService} from 'ngx-weui';
import {TermService} from '../../../../../services/backend/term.service';

@Component({
  selector: 'app-admin-backend-term-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class AdminBackendTermEditComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  termId;
  termForm: FormGroup;
  isSubmit = false;
  loading = false;

  constructor(private route: ActivatedRoute,
              private pickerSvc: PickerService,
              private userSvc: UserService,
              private termSvc: TermService) {
  }

  ngOnInit() {

    this.user = this.userSvc.isLogin();

    this.termId = this.route.snapshot.params['id'];

    this.termForm = new FormGroup({
      termId: new FormControl('', [Validators.required]),
      termName: new FormControl('', [Validators.required]),
      termNo: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required])
    });

    this.termForm.get('termId').setValue(this.termId);

    this.termSvc.getTerm(this.termId).then(res => {
      this.termForm.get('termName').setValue(res.term.termname);
      this.termForm.get('termNo').setValue(res.term.remark);
      this.termForm.get('startTime').setValue(res.term.starttime.split(' ')[0]);
      this.termForm.get('endTime').setValue(res.term.endtime.split(' ')[0]);
    });
  }

  showPicker(target) {
    this.pickerSvc.showDateTime('date').subscribe(res => {
      this.termForm.get(target).setValue(res.formatValue);
    });
  }

  onSubmit() {
    console.log(this.termForm.value);
    this.isSubmit = true;
    if (this.loading) {
      return false;
    }
    if (this.termForm.invalid) {
      return false;
    }

    this.loading = true;
    this.termSvc.saveTerm(this.termForm.value).then(res => {
      this.loading = false;
      window.history.back();
    });
  }

  back() {
    window.history.back();
  }
}
