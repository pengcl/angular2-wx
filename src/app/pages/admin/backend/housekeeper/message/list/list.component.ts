
import {timer as observableTimer, Observable} from 'rxjs';
import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../../../services/user.service';
import {RegionService} from '../../../../../../services/backend/region.service';
import {MessagesService} from '../../../../../../services/messages.service';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-housekeeper-message-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendHousekeeperMessageListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  types;
  list;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private regionSvc: RegionService,
              private messagesSvc: MessagesService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.messagesSvc.getTypeList().then(res => this.types = res.list).then(types => {
      this.messagesSvc.getSendMessages(this.user.id).then(res => {
        const sysMessages = [];
        res.list.forEach(item => {
          types.forEach(type => {
            if (type.itemValue === item.messagetype) {
              item.messageTypename = type.itemName;
            }
          });
          sysMessages.push(item);
        });
        this.list = sysMessages;
        console.log(this.list);
      });
    });
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    observableTimer(500).subscribe(() => {

      /*this.params.page = this.params.page + 1;

      this.housekeeperSvc.getWeeks(this.params).then(res => {
        this.works = this.works.concat(res.list);
        if (res.page === res.totalPage) {
          comp.setFinished();
          return;
        }
      });*/

      comp.resolveLoading();
    });
  }
}
