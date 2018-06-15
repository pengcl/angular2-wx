import {Component, OnInit} from '@angular/core';
import {PageConfig} from '../../page.config';

@Component({
  selector: 'app-guide-step8',
  templateUrl: './step-8.component.html',
  styleUrls: ['./step-8.component.scss']
})
export class GuideStep8Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor() {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }

  ngOnInit() {
  }

}
