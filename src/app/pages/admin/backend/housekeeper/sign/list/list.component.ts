
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {HousekeeperService} from '../../../../../../services/backend/housekeeper.service';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-housekeeper-sign-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendHousekeeperSignListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  signs;

  @ViewChild(InfiniteLoaderComponent) il;

  workStatus = [
    {
      label: '全部',
      value: '0'
    },
    {
      label: '待岗',
      value: '1'
    },
    {
      label: '出勤中',
      value: '2'
    },
    {
      label: '休假',
      value: '3'
    }
  ];

  workState = {
    label: '全部',
    value: '0'
  };

  params = {
    page: 1,
    name: '',
    workstatus: '',
    Q_begincreatetime_DL: '',
    Q_endcreatetime_DG: ''
  };

  constructor(private pickerSvc: PickerService,
              private userSvc: UserService,
              private housekeeperSvc: HousekeeperService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.getSigns();
  }

  getSigns() {
    this.housekeeperSvc.getSigns(this.params).then(res => {
      this.signs = res.list;
    });
  }

  inputChange(e) {
    this.params.page = 1;
    this.getSigns();
  }

  showPicker() {
    this.pickerSvc.show([this.workStatus], [], [], {cancel: '取消', confirm: '确定'}).subscribe(res => {
      this.workState = {
        label: res.items[0].label,
        value: res.items[0].value
      };
      this.params.workstatus = res.value;
      this.params.page = 1;
      this.getSigns();
    });
  }

  showPickerDate(target) {
    this.pickerSvc.showDateTime('date').subscribe((res: any) => {
      this.params[target] = res.formatValue;
      this.params.page = 1;
      this.getSigns();
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {
      this.params.page = this.params.page + 1;

      this.housekeeperSvc.getSigns(this.params).then(res => {
        this.signs = this.signs.concat(res.list);
        if (res.page >= res.totalPage) {
          comp.setFinished();
          return;
        }
      });

      comp.resolveLoading();
    });
  }
}
