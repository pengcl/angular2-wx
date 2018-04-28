import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';

@Component({
  selector: 'app-admin-backend-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class AdminBackendIndexComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  constructor() {
  }

  ngOnInit() {
  }
}
