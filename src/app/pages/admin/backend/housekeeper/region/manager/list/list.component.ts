import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {DATA} from '../../../../../../../utils/cn';

import {UserService} from '../../../../../../../services/user.service';
import {RegionService} from '../../../../../../../services/backend/region.service';
import {Observable} from 'rxjs/Observable';
import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';

import {getIndex} from '../../../../../../../utils/utils';

@Component({
  selector: 'app-admin-backend-housekeeper-region-manager-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class AdminBackendHousekeeperRegionManagerListComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;

  /*provinceCode=440000&cityCode=440100&countyCode=440106&userName=180****4040*/
  params = {
    provinceCode: '',
    cityCode: '',
    countyCode: '',
    userName: ''
  };
  list;

  provinces = [];
  province;
  cities = [];
  city;
  regions = [];
  region;

  constructor(private picker: PickerService,
              private userSvc: UserService,
              private regionSvc: RegionService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.getList();

    const provinces = [];
    DATA.forEach(item => {
      const province = {
        label: item.name,
        value: item.code,
        sub: item.sub
      };
      provinces.push(province);
    });
    this.provinces = provinces;
  }

  getList() {
    this.regionSvc.getManagers(this.params).then(res => {
      this.list = res.list;
      const list = [];
      for (const item in res) {
        if (res[item]) {
          list.push(res[item]);
        }
      }
      this.list = list;
    });
  }

  provincePicker() {
    this.picker.show([this.provinces], '', [0], {cancel: '返回', confirm: '确定'}).subscribe(res => {
      this.province = res.items[0];
      this.params.provinceCode = res.value;
      const index = getIndex(this.provinces, 'value', res.value);
      const cities = [];
      this.provinces[index].sub.forEach(item => {
        const city = {
          label: item.name,
          value: item.code,
          sub: item.sub
        };
        cities.push(city);
      });
      this.cities = cities;
      this.getList();
    });
  }

  cityPicker() {
    this.picker.show([this.cities], '', [0], {cancel: '返回', confirm: '确定'}).subscribe(res => {
      this.city = res.items[0];
      this.params.cityCode = res.value;
      const index = getIndex(this.cities, 'value', res.value);
      const regions = [];
      this.cities[index].sub.forEach(item => {
        const city = {
          label: item.name,
          value: item.code
        };
        regions.push(city);
      });
      this.regions = regions;
      this.getList();
    });
  }

  regionPicker() {
    this.picker.show([this.regions], '', [0], {cancel: '返回', confirm: '确定'}).subscribe(res => {
      this.region = res.items[0];
      this.params.countyCode = res.value;
      this.getList();
    });
  }

  onInput(e) {
    console.log(e);
    console.log(this.params.userName);
    this.getList();
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

      /*comp.resolveLoading();*/
    });
  }
}
