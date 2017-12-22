import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {
  openid;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.openid = this.userService.getOpenid();
    console.log(this.openid);
  }

}
