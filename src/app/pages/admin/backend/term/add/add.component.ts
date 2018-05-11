import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {PickerService} from 'ngx-weui';
import {TermService} from '../../../../../services/backend/term.service';

@Component({
  selector: 'app-admin-backend-term-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AdminBackendTermAddComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  termForm: FormGroup;
  isSubmit = false;
  loading = false;

  constructor(private pickerSvc: PickerService,
              private userSvc: UserService,
              private termSvc: TermService) {
  }

  ngOnInit() {

    this.user = this.userSvc.isLogin();

    this.termForm = new FormGroup({
      termName: new FormControl('', [Validators.required]),
      termNo: new FormControl('', [Validators.required]),
      startTime: new FormControl('', [Validators.required]),
      endTime: new FormControl('', [Validators.required])
    });
  }

  showPicker(target) {
    this.pickerSvc.showDateTime('date').subscribe(res => {
      this.termForm.get(target).setValue(res.formatValue);
    });
  }

  onSubmit() {
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
}
