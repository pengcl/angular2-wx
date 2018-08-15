
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {HousekeeperService} from '../../../../../../services/backend/housekeeper.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';
import {BackendLeaveService} from '../../../../../../services/backend/leave.service';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-housekeeper-week-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendHousekeeperWeekListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  works;
  omissionList;

  pickerData = {
    iscomplete: {
      selected: '',
      data: [
        {
          label: '不完整',
          value: '0'
        },
        {
          label: '完整',
          value: '1'
        }
      ]
    },
    auditstatus: {
      selected: '',
      data: [
        {
          label: '未批复',
          value: '0'
        },
        {
          label: '已批复',
          value: '1'
        }
      ]
    }
  };

  params = {
    housekeepername: '',
    iscomplete: '',
    auditstatus: '',
    page: 1
  };

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private housekeeperSvc: HousekeeperService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.getData();
  }

  getData() {
    this.housekeeperSvc.getWeeks(this.params).then(res => {
      if (res.code === 0) {
        this.works = res.list;
        this.omissionList = res.omissionList;
        console.log(this.omissionList);
      }
    });
  }

  inputChange(e) {
    this.params.page = 1;
    this.getData();
  }

  showPicker(target) {
    this.picker.show([this.pickerData[target].data], '', [0], {cancel: '返回', confirm: '确定'}).subscribe(res => {
      this.pickerData[target].selected = res.items[0].label;
      this.params[target] = res.value;

      this.params.page = 1;
      this.getData();
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {

      this.params.page = this.params.page + 1;

      this.housekeeperSvc.getWeeks(this.params).then(res => {
        this.works = this.works.concat(res.list);
        if (res.page === res.totalPage) {
          comp.setFinished();
          return;
        }
      });

      comp.resolveLoading();
    });
  }
}
