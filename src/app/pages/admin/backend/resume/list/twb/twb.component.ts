import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-admin-backend-resume-list-twb',
  templateUrl: './twb.component.html',
  styleUrls: ['./twb.component.scss']
})
export class AdminBackendResumeListTwbComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  trainees: any[] = [];

  params = {
    soldierType: 2,
    page: 1,
    type: 1,
    custId: '',
    Q_name_S: '',
    Q_begincreatetime_DL: '',
    Q_endcreatetime_DG: '',
    totalPage: 0
  };

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.params.custId = this.user.id;
    this.getSoldiers();
  }

  setType(type: number) {
    this.params.type = type;
    this.params.page = 1;
    this.trainees = [];
    this.getSoldiers();
  }

  getSoldiers() {
    this.traineeSvc.getSoldiers(this.params).then(res => {
      console.log(res);
      if (res.code === 0) {
        this.params.totalPage = res.totalPage;
        this.trainees = res.list;
      }
    });
  }

  inputChange(e) {
    this.params.page = 1;
    this.trainees = [];
    this.getSoldiers();
  }

  showPicker(target) {
    this.picker.showDateTime('date').subscribe((res: any) => {
      this.params[target] = res.formatValue;
      this.params.page = 1;
      this.trainees = [];
      this.getSoldiers();
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
