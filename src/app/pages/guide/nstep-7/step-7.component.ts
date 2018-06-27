import {Component, OnInit} from '@angular/core';
import {PageConfig} from '../../page.config';

import {UaService} from '../../../services/ua.service';

@Component({
  selector: 'app-guide-n-step7',
  templateUrl: './step-7.component.html',
  styleUrls: ['./step-7.component.scss']
})
export class GuideNStep7Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  isWx = false;

  constructor(private uaSvc: UaService) {
    this.navBarConfig.navigationBarTitleText = '大牛管家';
  }


  ngOnInit() {
    this.isWx = this.uaSvc.isWx();
    console.log(this.uaSvc.isWx());
  }

}
