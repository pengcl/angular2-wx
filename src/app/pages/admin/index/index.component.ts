import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-admin-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AdminIndexComponent implements OnInit {
  userInfo;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.userInfo = this.userService.isLogin();
    console.log(this.userInfo);
    /*this.userService.login().then(isLogin => {
    });*/
    /*this.openid = this.userService.getOpenid();
    this.userService.getUser(this.openid).then(user => {
      this.userInfo = user;
      console.log(this.userInfo);
    });*/
  }

}
