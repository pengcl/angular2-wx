import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';

@Component({
  selector: 'app-front-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class FrontIndexComponent implements OnInit {
  tabBarConfig;
  navBarConfig;
  items = [1, 2, 3, 4, 5];

  constructor() {
  }

  ngOnInit() {
    this.tabBarConfig = PageConfig.tabBar;
    this.navBarConfig = PageConfig.navBar;
    console.log(this.tabBarConfig);
    console.log(this.navBarConfig);
  }

}
