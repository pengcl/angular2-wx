import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';

import {ActivatedRoute} from '@angular/router';

import {UserService} from '../../../../../../services/user.service';
import {HousekeeperService} from '../../../../../../services/backend/housekeeper.service';
import {TraineeService} from '../../../../../../services/backend/trainee.service';
import {BackendLeaveService} from '../../../../../../services/backend/leave.service';
import {EventService} from '../../../../../../services/event.service';
import {DialogService} from 'ngx-weui';
import {getIndex} from '../../../../../../utils/utils';


@Component({
  selector: 'app-admin-backend-housekeeper-leave-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminBackendHousekeeperLeaveItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  event;
  formData;

  constructor(private route: ActivatedRoute,
              private userSvc: UserService,
              private housekeeperSvc: HousekeeperService,
              private traineeSvc: TraineeService,
              private leaveSvc: BackendLeaveService,
              private eventSvc: EventService,
              private dialogSvc: DialogService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();

    this.leaveSvc.getTask(this.user.id, this.route.snapshot.params['id'])
      .then(res => res)
      .then(task => {
        this.eventSvc.getEventDetail(this.route.snapshot.queryParams['eventId']).then(res => {
          this.event = res.event;
          console.log(task);
          const body = {
            taskId: task.taskId,
            custId: this.user.id,
            eventid: res.event.eventid,
            startDateStr: res.event.startdate,
            endDateStr: res.event.enddate,
            leaveday: res.event.leaveday,
            leavetype: res.event.leavetype,
            eventtypeid: res.event.eventtypeid
          };
          /*body.taskId = res.task.taskId;
          body.custId = this.user.id;
          body.eventid = res.event.eventid;
          body.startDateStr = res.event.startdate;
          body.endDateStr = res.event.enddate;
          body.leaveday = res.event.leaveday;
          body.leavetype = res.event.leavetype;
          body.eventtypeid = res.event.eventtypeid;*/
          this.formData = body;
          console.log(this.formData);
        });
      });
  }

  refuse() {
    this.formData.voteAgree = 2;
    this.leaveSvc.completeTask(this.formData).then(res => {
      let msg = '';
      if (res.code === 0) {
        msg = '提交成功';
      } else {
        msg = res.msg;
      }

      this.dialogSvc.show({content: msg, cancel: '', confirm: '我知道了'}).subscribe(data => {
        window.history.back();
      });
    });
  }

  pass() {
    this.formData.voteAgree = 1;
    this.leaveSvc.completeTask(this.formData).then(res => {
      let msg = '';
      if (res.code === 0) {
        msg = '提交成功';
      } else {
        msg = res.msg;
      }

      this.dialogSvc.show({content: msg, cancel: '', confirm: '我知道了'}).subscribe(data => {
        window.history.back();
      });
    });
  }
}
