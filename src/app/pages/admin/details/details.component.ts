import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WXService} from '../../../services/wx.service';
import {UserService} from '../../../services/user.service';


@Component({
  selector: 'app-admin-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class AdminDetailsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;

  gallery;

  slides: string[] = [
    '/assets/1.jpg',
    '/assets/2.jpg',
    '/assets/3.jpg',
    '/assets/4.jpg'
  ];

  constructor(private wx: WXService, private userSvc: UserService) {
  }

  showGallery(show: boolean) {
    this.gallery = show;
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }
  }

}
