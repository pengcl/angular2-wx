import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {Location} from '@angular/common';

import {PageConfig} from './page.config';
import {WXService} from '../../../../services/wx.service';
import {UserService} from '../../../../services/user.service';
import {ButlerService} from '../../../../services/butler.service';
import {Uploader, UploaderOptions} from '../../../../modules/uploader';
import {Config} from '../../../../config';

declare var F2: any;

@Component({
  selector: 'app-admin-uploader-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AdminUploaderAvatarComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;

  img: any;
  imgShow: boolean = false;

  housekeeper;

  uploader: Uploader = new Uploader(<UploaderOptions>{
    url: Config.prefix.wApi + '/interface/housekeeper/uploadHeadImage.ht',
    headers: [],
    params: {
      housekeeperId: '10000096750345'
    },
    // 自定义transport
    // uploadTransport: function(item: FileItem) {
    //     return Observable.create(observer => {
    //         setTimeout(() => {
    //             observer.next(true);
    //             observer.complete();
    //         }, 1000 * 3);
    //     });
    // },
    onFileQueued: function () {
      console.log('onFileQueued', arguments);
    },
    onFileDequeued: function () {
      console.log('onFileDequeued', arguments);
    },
    onStart: function () {
      console.log('onStart', arguments);
    },
    onCancel: function () {
      console.log('onCancel', arguments);
    },
    onFinished: function () {
      console.log('onFinished', arguments);
      window.history.back();
    },
    onUploadStart: function () {
      console.log('onUploadStart', arguments);
    },
    onUploadProgress: function () {
      console.log('onUploadProgress', arguments);
    },
    onUploadSuccess: function () {
      console.log('onUploadSuccess', arguments);
    },
    onUploadError: function () {
      console.log('onUploadError', arguments);
    },
    onUploadComplete: function () {
      console.log('onUploadComplete', arguments);
    },
    onUploadCancel: function () {
      console.log('onUploadCancel', arguments);
    },
    onError: function () {
      console.log('onError', arguments);
    }
  });

  constructor(private wx: WXService,
              private userSvc: UserService,
              private butlerSvc: ButlerService) {
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }
    this.butlerSvc.getHousekeeper('10000096750345').then(housekeeper => {
      this.housekeeper = JSON.parse((JSON.parse(housekeeper)).msg);
    });
  }

  onGallery(item: any) {
    this.img = [{file: item._file, item: item}];
    this.imgShow = true;
  }

  onDel(item: any) {
    this.uploader.removeFromQueue(item.item);
  }

}
