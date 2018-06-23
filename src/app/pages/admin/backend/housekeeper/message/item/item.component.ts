import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../../../../../services/user.service';
import {MessagesService} from '../../../../../../services/messages.service';

@Component({
  selector: 'app-admin-backend-housekeeper-message-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminBackendHousekeeperMessageItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  user: any;
  id;

  message;
  notReadList;
  readList;

  constructor(private route: ActivatedRoute,
              private userSvc: UserService,
              private messagesSvc: MessagesService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.id = this.route.snapshot.params['id'];
    this.messagesSvc.getMessage(this.id).then(res => {
      this.message = res.message;
      this.notReadList = res.notReadList;
      this.readList = res.readList;
      console.log(res);
    });
  }
}
