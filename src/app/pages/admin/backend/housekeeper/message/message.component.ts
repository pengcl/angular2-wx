
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../services/user.service';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-housekeeper-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class AdminBackendHousekeeperMessageComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private picker: PickerService,
              private userSvc: UserService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {

      /*this.params.page = this.params.page + 1;
      this.housekeeperSvc.get(this.params).then(res => {
        if (res.code === 0) {
          this.housekeepers = this.housekeepers.concat(res.list);
          if (res.page >= res.totalPage) {
            comp.setFinished();
            return;
          }
        }
      });*/

      comp.resolveLoading();
    });
  }
}
