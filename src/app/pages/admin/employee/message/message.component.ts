import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MessagesService} from '../../../../services/messages.service';

@Component({
  selector: 'app-admin-employee-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class AdminEmployeeMessageComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  sysMessages;

  tab: string = 'system';
  types;

  constructor(private wx: WxService, private userSvc: UserService, private messages: MessagesService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.messages.getTypeList().then(res => this.types = res.list).then(types => {
      this.messages.getMessages(this.user.id).then(res => {
        const sysMessages = [];
        res.list.forEach(item => {
          types.forEach(type => {
            if (type.itemValue === item.messagetype) {
              item.messageTypename = type.itemName;
            }
          });
          sysMessages.push(item);
        });
        this.sysMessages = sysMessages;
      });
    });
  }

  setTab(tab) {
    this.tab = tab;
  }

}
