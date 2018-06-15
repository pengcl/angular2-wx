import {Component, OnInit} from '@angular/core';

import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MessagesService} from '../../../../services/messages.service';
import {DialogService} from 'ngx-weui';

@Component({
  selector: 'app-admin-employer-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class AdminEmployerMessageComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  sysMessages;

  tab: string = 'system';
  types;

  constructor(private wx: WxService, private userSvc: UserService, private messages: MessagesService, private dialogSvc: DialogService) {
  }

  // todo 提示信息不对
  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.messages.getTypeList().then(res => this.types = res.list).then(types => {
      this.messages.getMessages(this.user.id).then(res => {
        const sysMessages = [];
        res.list.forEach(item => {
          if (!item.isRead) {
            this.messages.read(item.messageid).then();
          }
          console.log(item);
          types.forEach(type => {
            if (type.itemValue === item.messagetype) {
              item.messageTypename = type.itemName;
            }
          });
          sysMessages.push(item);
        });
        this.sysMessages = sysMessages;
        console.log(this.sysMessages);
      });
    });
  }

  setTab(tab) {
    this.tab = tab;
  }

  confirm(url, _item) {
    this.messages.confirm(url).then(res => {
      let msg = '';
      if (res.code === 0) {
        msg = '已成功确认';
        this.messages._confirm(_item.messageid).then();
        this.messages.getTypeList().then(_res => this.types = _res.list).then(types => {
          this.messages.getMessages(this.user.id).then(_res => {
            const sysMessages = [];
            _res.list.forEach(item => {
              types.forEach(type => {
                if (type.itemValue === item.messagetype) {
                  item.messageTypename = type.itemName;
                }
              });
              sysMessages.push(item);
            });
            this.sysMessages = sysMessages;
            console.log(this.sysMessages);
          });
        });
      } else {
        msg = res.msg;
      }

      this.dialogSvc.show({content: msg, cancel: '', confirm: '我知道了'}).subscribe();
    });
  }
}
