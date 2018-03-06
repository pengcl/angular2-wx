import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../../modules/wx';
import {UserService} from '../../../../../../services/user.service';
import {EventService} from '../../../../../../services/event.service';

@Component({
  selector: 'app-admin-employee-adm-approvals-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class AdminEmployeeADMApprovalsEventsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  event: any = {};

  constructor(private router: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private eventSvc: EventService) {
  }

  ngOnInit() {
    this.event.typeId = this.router.snapshot.paramMap.get('typeId');
    this.user = this.userSvc.isLogin();
    this.eventSvc.getEventList({
      custId: this.user.id,
      type: this.event.typeId
    }).then(res => {
      console.log(res);
      this.event.list = res.list;
    });
  }
}
