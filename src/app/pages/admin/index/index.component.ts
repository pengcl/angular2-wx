import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-admin-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AdminIndexComponent implements OnInit {
  userId;

  constructor(private userService: UserService) {
  }

  ngOnInit() {

    this.userId = this.userService.isLogin();
    console.log(this.userId);

    /*this.userService.getUser('5a461ef28b24c6546b2679d6').then(function (data) {
      console.log(data);
    });*/
    /*this.userInfo = this.userService.isLogin();
    console.log(this.userInfo);*/
    /*this.userService.login().then(isLogin => {
    });*/
    /*this.openid = this.userService.getOpenid();
    this.userService.getUser(this.openid).then(user => {
      this.userInfo = user;
      console.log(this.userInfo);
    });*/
  }

}
