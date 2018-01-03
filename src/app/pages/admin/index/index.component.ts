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
  }

}
