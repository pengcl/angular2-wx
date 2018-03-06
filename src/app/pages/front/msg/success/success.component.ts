import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './page.config';

@Component({
  selector: 'app-front-msg-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class FrontMsgSuccessComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor() {
  }


  ngOnInit() {
  }

}
