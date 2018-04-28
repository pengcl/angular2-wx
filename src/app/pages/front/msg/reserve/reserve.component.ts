import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

@Component({
  selector: 'app-front-msg-reserve',
  templateUrl: './reserve.component.html',
  styleUrls: ['./reserve.component.scss']
})
export class FrontMsgReserveComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor() {
  }


  ngOnInit() {
  }

}
