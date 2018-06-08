import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {Observable} from 'rxjs/Observable';
import {InfiniteLoaderComponent} from 'ngx-weui';

@Component({
  selector: 'app-admin-article-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminArticleListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  constructor() {
  }

  ngOnInit() {
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

    });
  }
}
