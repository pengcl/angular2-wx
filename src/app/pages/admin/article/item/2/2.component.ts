import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageConfig} from './page.config';

@Component({
  selector: 'app-admin-article-item-2',
  templateUrl: './2.component.html',
  styleUrls: ['./2.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminArticleItem2Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  constructor() {
  }

  ngOnInit() {
  }
}
