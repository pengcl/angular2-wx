import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {DATA} from '../../../../../../utils/cn';

import {UserService} from '../../../../../../services/user.service';
import {RegionService} from '../../../../../../services/backend/region.service';
import {Observable} from 'rxjs/Observable';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

@Component({
  selector: 'app-admin-backend-housekeeper-region-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendHousekeeperRegionListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  list;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private regionSvc: RegionService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.regionSvc.get().then(res => {
      this.list = res.list;
      console.log(this.list);
    });

    /*this.regionSvc.getRegions().then(res => {
      console.log(res);
    });*/
  }

  /*inputChange(e) {
    this.params.page = 1;
    this.getData();
  }

  showPicker(target) {
    this.picker.show([this.pickerData[target].data], '', [0], {cancel: '返回', confirm: '确定'}).subscribe(res => {
      this.pickerData[target].selected = res.items[0].label;
      this.params[target] = res.value;

      this.params.page = 1;
      this.getData();
    });
  }*/

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      /*this.params.page = this.params.page + 1;

      this.housekeeperSvc.getWeeks(this.params).then(res => {
        this.works = this.works.concat(res.list);
        if (res.page === res.totalPage) {
          comp.setFinished();
          return;
        }
      });*/

      comp.resolveLoading();
    });
  }
}
