import {Component, OnInit, ViewChild} from '@angular/core';
import {PageConfig} from './../../../page.config';
import {WxService} from '../../../../modules/wx';
import {UserService} from '../../../../services/user.service';
import {MoService} from '../../../../services/mo.service';
import {EmployeeService} from '../../../../services/employee.service';

import {simAnim, slide} from '../../../../utils/animate';

import {InfiniteLoaderComponent, PickerService} from 'ngx-weui';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {getIndex} from '../../../../utils/utils';

@Component({
  selector: 'app-front-guide-step3',
  templateUrl: './step-3.component.html',
  styleUrls: ['./step-3.component.scss'],
  animations: [simAnim, slide]
})
export class FrontGuideStep3Component implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;

  gh = '';
  employees;

  pageSize: number = 6;
  currPage: number = 1;
  currLists: any[];
  lists: any[];

  levels;
  level;

  syntheticals = [
    {
      label: '综合排序',
      value: 'all'
    },
    {
      label: '驾驶出行',
      value: 'drive'
    },
    {
      label: '健康运动',
      value: 'health'
    },
    {
      label: '安全防护',
      value: 'safe'
    }
  ];
  synthetical = {
    label: '综合排序',
    value: 'all'
  };

  show = {
    level: false,
    score: false
  };

  @ViewChild(InfiniteLoaderComponent) il;

  constructor(private router: ActivatedRoute,
              private wx: WxService,
              private userSvc: UserService,
              private moSvc: MoService,
              private employeeSvc: EmployeeService,
              private picker: PickerService) {
    this.navBarConfig.navigationBarTitleText = '为您推荐管家';
  }

  ngOnInit() {
    this.wx.config({
      title: '大牛管家服务预订',
      desc: '专注提供贴心的高级管家服务，包括安全防护、科学运动、驾驶出行三大类日常综合管家服务！',
      link: 'http://wap.danius.cn/front/guide',
      imgUrl: 'http://wap.danius.cn/assets/images/front/guide/share-icon.jpg'
    }).then(() => {
      // 其它操作，可以确保注册成功以后才有效
      console.log('注册成功');
    }).catch((err: string) => {
      console.log(`注册失败，原因：${err}`);
    });
    this.employeeSvc.getLevelList().then(res => {
      const levels = [];
      res.list.forEach(item => {
        const level = {
          label: '',
          value: ''
        };
        level.label = item.levelname;
        level.value = item.levelid.toString();
        levels.push(level);
      });
      this.levels = levels;
      const levelIndex = this.router.snapshot.queryParams['level'] ? getIndex(this.levels, 'value', this.router.snapshot.queryParams['level']) : 0;
      return this.level = this.levels[levelIndex];
    }).then((level) => {
      const body = {
        serviceAreaId: this.router.snapshot.queryParams['city'],
        levelId: this.level.value,
        synthetical: this.synthetical.value
      };
      this.employeeSvc.getHousekeepers(body).then(res => {
        this.employees = res.list;
        this.lists = res.list;
        this.currLists = res.list.slice(0, this.pageSize);
      });
    });

  }

  onPickerShow(target) {
    this.show[target] = true;
    if (target === 'level') {
      this.picker.show([this.levels], {}, [], {confirm: '确定'}).subscribe((res: any) => {
        this.show[target] = false;
        this.level = res.items[0];
        const body = {
          serviceAreaId: this.router.snapshot.queryParams['city'],
          levelId: this.level.value,
          synthetical: this.synthetical.value
        };
        this.employeeSvc.getHousekeepers(body).then(_res => {
          this.employees = _res.list;
          this.lists = _res.list;
          this.currLists = _res.list.slice(0, this.pageSize);
          this.currPage = 1;
        });
      });
    }

    if (target === 'score') {
      this.picker.show([this.syntheticals], {}, [], {confirm: '确定'}).subscribe((res: any) => {
        this.show[target] = false;
        this.synthetical = res.items[0];
        const body = {
          serviceAreaId: this.router.snapshot.queryParams['city'],
          levelId: this.level.value,
          synthetical: this.synthetical.value
        };
        this.employeeSvc.getHousekeepers(body).then(_res => {
          this.employees = _res.list;
          this.lists = _res.list;
          this.currLists = _res.list.slice(0, this.pageSize);
          this.currPage = 1;
        });
      });
    }
  }

  onLoadMore(comp: InfiniteLoaderComponent) {
    Observable.timer(500).subscribe(() => {

      this.currPage = this.currPage + 1;
      this.currLists = this.lists.slice(0, this.pageSize * this.currPage); // 获取当前页数据

      if (this.currLists.length >= this.lists.length) {
        comp.setFinished();
        return;
      }

      comp.resolveLoading();
    });
  }

}
