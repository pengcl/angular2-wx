import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageConfig} from './page.config';
import {WxService} from '../../../../../../modules/wx';
import {UserService} from '../../../../../../services/user.service';
import {EventService} from '../../../../../../services/event.service';

@Component({
  selector: 'app-admin-employer-approvals-leaves-leave',
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.scss']
})
export class AdminEmployerApprovalsLeavesLeaveComponent implements OnInit {
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
    this.user = this.userSvc.isLogin();
    this.event.eventId = this.router.snapshot.paramMap.get('eventId');
    this.eventSvc.getEventDetail(this.event.eventId).then(res => {
      this.event.event = res.event;
    });
    this.eventSvc.getEventProcess(this.event.eventId).then(res => {
      this.event.process = res.list;
    });
  }

  approve(state) {
    this.eventSvc.approve({
      eventId: this.event.eventId,
      isConfirm: state
    }).then(res => {
    });
  }
}
