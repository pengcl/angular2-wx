import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {TraineeService} from '../../../../../services/backend/trainee.service';
import {TermService} from '../../../../../services/backend/term.service';
import {Observable} from 'rxjs/Observable';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-trainee-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendTraineeListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  trainees: any[] = [];

  pickerData = {
    term: {
      selected: '请选择',
      data: []
    }
  };

  params = {
    page: 1,
    custId: '',
    totalPage: 0,
    traineename: '',
    Q_begincreatetime_DL: '',
    Q_endcreatetime_DG: ''
  };

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private traineeSvc: TraineeService,
              private termSvc: TermService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.params.custId = this.user.id;

    this.termSvc.getTermList().then(res => {
      res.list.forEach(item => {
        this.pickerData.term.data.push({
          label: item.termname,
          value: item.termid,
          date: item.remark
        });
      });
    });

    this.getTrainees();
  }

  getTrainees() {
    this.traineeSvc.getTrainees(this.params).then(res => {
      console.log(res);
      if (res.code === 0) {
        this.params.totalPage = res.totalPage;
        this.trainees = res.list;
      }
    });
  }

  inputChange(e) {
    console.log(e);
    this.params.page = 1;
    this.trainees = [];
    this.getTrainees();
  }

  showPicker(target) {
    this.picker.showDateTime('date').subscribe((res: any) => {
      this.params[target] = res.formatValue;
      this.params.page = 1;
      this.trainees = [];
      this.getTrainees();
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      if (this.params.page < this.params.totalPage) {
        this.params.page = this.params.page + 1;
        this.traineeSvc.getCommons(this.params).then(res => {
          if (res.code === 0) {
            this.params.totalPage = res.totalPage;
            this.trainees = this.trainees.concat(res.list);
          }
        });
      }

      if (this.params.page === this.params.totalPage) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }
}
