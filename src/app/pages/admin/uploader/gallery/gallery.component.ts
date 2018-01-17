import {Component, ViewEncapsulation, ViewChild, Input, OnInit} from '@angular/core';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';

import 'rxjs/add/operator/switchMap';

import {PageConfig} from './page.config';
import {Config} from '../../../../config';

import {UploaderOptions, FileItem, Uploader, UploaderHeaders} from '../../../../modules/uploader';
import {WXService} from '../../../../services/wx.service';
import {UserService} from '../../../../services/user.service';
import {ButlerService} from '../../../../services/butler.service';

declare var F2: any;

@Component({
  selector: 'app-admin-uploader-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class AdminUploaderGalleryComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  userId: string;
  user: any;

  img: any;
  imgShow: boolean = false;

  uploader: Uploader = new Uploader(<UploaderOptions>{
    url: Config.prefix.wApi + '/interface/housekeeper/uploadImage.ht',
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
  }

  onGallery(item: any) {
    this.img = [{file: item._file, item: item}];
    this.imgShow = true;
  }

  onDel(item: any) {
    this.uploader.removeFromQueue(item.item);
  }

}
