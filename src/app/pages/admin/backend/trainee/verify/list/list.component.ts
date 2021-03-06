
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';
import {TermService} from '../../../../../../services/backend/term.service';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-trainee-verify-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendTraineeVerifyListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  trainees: any[] = [];

  params = {
    page: 1,
    custId: '',
    toApply: 1,
    applyToHousekeeper: 1,
    Q_begincreatetime_DL: '',
    Q_endcreatetime_DG: '',
    totalPage: 0,
    traineename: '',
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

  setType(type) {
    this.params.applyToHousekeeper = type;
    this.getTrainees();
  }

  inputChange(e) {
    this.params.page = 1;
    this.getTrainees();
  }

  showPicker(target) {
    this.picker.showDateTime('date').subscribe((res: any) => {
      this.params[target] = res.formatValue;
      this.params.page = 1;
      this.getTrainees();
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {

      this.params.page = this.params.page + 1;
      this.traineeSvc.getCommons(this.params).then(res => {
        if (res.code === 0) {
          if (res.page >= res.totalPage) {
            comp.setFinished();
            return;
          }
          this.trainees = this.trainees.concat(res.list);
        }
      });

      comp.resolveLoading();
    });
  }
}
