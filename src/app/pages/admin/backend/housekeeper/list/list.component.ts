import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {HousekeeperService} from '../../../../../services/backend/housekeeper.service';
import {TraineeService} from '../../../../../services/backend/trainee.service';
import {Observable} from 'rxjs/Observable';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-housekeeper-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendHousekeeperListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  housekeepers: any[] = [];
  areas;
  area;

  levels;
  level = {
    label: '全部',
    value: ''
  };

  params = {
    page: 1,
    name: '',
    totalPage: 0,
    levelid: '',
    serviceareaids: [],
    workstatus: 1,
    issubscribe: ''
  };

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private housekeeperSvc: HousekeeperService,
              private traineeSvc: TraineeService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.traineeSvc.getServiceAreaList().then(res => {
      this.areas = res.list;
    });

    this.traineeSvc.getLevelList().then(res => {
      this.levels = [];
      res.list.forEach(item => {
        this.levels.push({
          label: item.levelname,
          value: item.levelid
        });
      });
      this.levels.push({
        label: '全部',
        value: ''
      });
    });

    this.getHousekeepers();
  }

  getHousekeepers() {
    this.housekeeperSvc.get(this.params).then(res => {
      if (res.code === 0) {
        this.housekeepers = res.list;
        console.log(this.housekeepers);
      }
    });
  }

  inputChange(e) {
    this.params.page = 1;
    this.housekeepers = [];
    this.getHousekeepers();
  }

  showPicker(target) {
    this.picker.showDateTime('date').subscribe((res: any) => {
      this.params[target] = res.formatValue;
      this.params.page = 1;
      this.getHousekeepers();
    });
  }

  setArea(area) {
    this.params.serviceareaids[0] = area.areaid;
    this.params.page = 1;
    this.getHousekeepers();
  }

  setWorkState(state) {
    this.params.workstatus = state;
    this.params.page = 1;
    this.getHousekeepers();
  }

  setSubscribe() {
    this.params.issubscribe === '0' ? this.params.issubscribe = '' : this.params.issubscribe = '0';
    this.params.page = 1;
    this.getHousekeepers();
  }

  setLevel() {
    this.picker.show([this.levels], [], [], {cancel: '取消', confirm: '确定'}).subscribe(res => {
      this.level = res.items[0];
      this.params.levelid = this.level.value;
      this.params.page = 1;
      console.log(this.params);
      this.getHousekeepers();
    });
  }

  /*setArea(area) {
    const index = this.params.serviceareaids.indexOf(area.areaid);
    if (index !== -1) {
      this.params.serviceareaids = removeByIndex(this.params.serviceareaids, index);
    } else {
      this.params.serviceareaids.push(area.areaid);
    }

    this.getHousekeepers();
  }*/

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.params.page = this.params.page + 1;
      this.housekeeperSvc.get(this.params).then(res => {
        if (res.code === 0) {
          this.housekeepers = this.housekeepers.concat(res.list);
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
