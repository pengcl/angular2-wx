import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageConfig} from './page.config';

import {Config} from '../../../../../config';

@Component({
  selector: 'app-admin-article-item-1',
  templateUrl: './1.component.html',
  styleUrls: ['./1.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AdminArticleItem1Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  show = false;

  images = [
    Config.webHost + '/assets/images/article/1/attachment/1.jpg',
    Config.webHost + '/assets/images/article/1/attachment/2.jpg',
    Config.webHost + '/assets/images/article/1/attachment/3.jpg',
    Config.webHost + '/assets/images/article/1/attachment/4.jpg',
    Config.webHost + '/assets/images/article/1/attachment/5.jpg',
    Config.webHost + '/assets/images/article/1/attachment/6.jpg',
    Config.webHost + '/assets/images/article/1/attachment/7.jpg',
    Config.webHost + '/assets/images/article/1/attachment/8.jpg',
    Config.webHost + '/assets/images/article/1/attachment/9.jpg',
    Config.webHost + '/assets/images/article/1/attachment/10.jpg',
    Config.webHost + '/assets/images/article/1/attachment/11.jpg',
    Config.webHost + '/assets/images/article/1/attachment/12.jpg',
    Config.webHost + '/assets/images/article/1/attachment/13.jpg',
    Config.webHost + '/assets/images/article/1/attachment/14.jpg',
    Config.webHost + '/assets/images/article/1/attachment/15.jpg',
    Config.webHost + '/assets/images/article/1/attachment/16.jpg',
    Config.webHost + '/assets/images/article/1/attachment/17.jpg'
  ];
  galleryCurrent = 0;

  constructor() {
  }

  ngOnInit() {
  }

  showGallery(current) {
    this.galleryCurrent = current;
    this.show = true;
  }
}
