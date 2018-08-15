import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';



import {PageConfig} from './page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {EmployeeService} from '../../../../services/employee.service';
import {StorageService} from '../../../../services/storage.service';
import {Config} from '../../../../config';

declare var $: any;

@Component({
  selector: 'app-admin-employee-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class AdminEmployeeSettingComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  config = Config;
  user: any;

  show: boolean = false;

  images;
  galleryCurrent = 0;

  housekeeper: any;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storageSvc: StorageService,
              private wx: WxService,
              private userSvc: UserService,
              private employeeSvc: EmployeeService) {
  }

  showGallery(current) {
    this.show = true;
    this.galleryCurrent = current;
  }

  onDelete(current: any) {
    this.employeeSvc.delImage({imageid: this.housekeeper.imageList[current].imageid}).then(res => {
      this.images.splice(current, 1);
      this.housekeeper.imageList.splice(current, 1);
    });
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.employeeSvc.getHousekeeper(this.user.housekeeperId).then(res => {
      this.housekeeper = res.housekeeper;
      console.log(this.housekeeper);
      const images = [];
      $.each(this.housekeeper.imageList, function (i, k) {
        images.push(k.imageurl);
      });
      this.images = images;
    });
  }

  logout() {
    this.storageSvc.clear();
    this.router.navigate(['/admin/login']);
  }

}
