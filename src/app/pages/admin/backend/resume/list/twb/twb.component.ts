import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';
import {EmployerService} from '../../../../../../services/employer.service';
import {StorageService} from '../../../../../../services/storage.service';
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
  employer;
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

  @ViewChild('comp') private il: InfiniteLoaderComponent;

  constructor(private route: ActivatedRoute,
              private storageSvc: StorageService,
              private picker: PickerService,
              private userSvc: UserService,
              private employerSvc: EmployerService,
              private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.params.custId = this.user.id;
    this.params.type = this.storageSvc.get('backTab') ? parseInt(this.storageSvc.get('backTab'), 10) : 1;
    console.log(this.params);
    this.getSoldiers();

    this.employerSvc.getEmployer(this.user.id).then(res => {
      this.employer = res.cust;
    });
  }

  setType(type: number) {
    this.params.type = type;
    this.storageSvc.set('backTab', type);
    this.params.page = 1;
    this.getSoldiers();
  }

  getSoldiers() {
    this.il.restart();
    this.traineeSvc.getSoldiers(this.params).then(res => {
      if (res.code === 0) {
        this.params.totalPage = res.totalPage;
        this.trainees = res.list;
      }
    });
  }

  inputChange(e) {
    this.params.page = 1;
    this.getSoldiers();
  }

  showPicker(target) {
    this.picker.showDateTime('date').subscribe((res: any) => {
      this.params[target] = res.formatValue;
      this.params.page = 1;
      this.getSoldiers();
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(1500).subscribe(() => {
      this.params.page = this.params.page + 1;
      this.traineeSvc.getSoldiers(this.params).then(res => {
        if (res.code === 0) {
          this.trainees = this.trainees.concat(res.list);
          if (res.page >= res.totalPage) {
            comp.setFinished();
            return;
          }
        }
      });

      comp.resolveLoading();
    });
  }
}
