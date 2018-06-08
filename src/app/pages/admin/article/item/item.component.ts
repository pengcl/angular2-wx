import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';

@Component({
  selector: 'app-admin-article-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class AdminArticleItemComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  constructor() {
  }

  ngOnInit() {
  }
}
