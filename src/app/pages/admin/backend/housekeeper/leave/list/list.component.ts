
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {HousekeeperService} from '../../../../../../services/backend/housekeeper.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';
import {BackendLeaveService} from '../../../../../../services/backend/leave.service';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-housekeeper-leave-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendHousekeeperLeaveListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  leavers;

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private housekeeperSvc: HousekeeperService,
              private traineeSvc: TraineeService,
              private leaveSvc: BackendLeaveService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.leaveSvc.getLeavers(this.user.id).then(res => {
      this.leavers = res.list;
      console.log(res);
    });
  }

  inputChange(e) {
  }

  showPicker(target) {
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {

      comp.resolveLoading();
    });
  }
}
