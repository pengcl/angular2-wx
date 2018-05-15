import {Component, OnInit} from '@angular/core';
import {PageConfig} from '../../page.config';

@Component({
  selector: 'app-guide-step7',
  templateUrl: './step-7.component.html',
  styleUrls: ['./step-7.component.scss']
})
export class GuideStep7Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  constructor() {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
  }

}
