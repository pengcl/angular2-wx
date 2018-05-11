import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';

import {UserService} from '../../../../services/user.service';
import {TraineeService} from '../../../../services/backend/trainee.service';
import {PickerService} from 'ngx-weui';
import {EmployerService} from '../../../../services/employer.service';

declare var F2: any;

@Component({
  selector: 'app-admin-backend-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class AdminBackendStatisticsComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  user: any;
  employer;
  trainees: any[] = [];
  statistics;

  pickerDate = {
    start: '',
    end: ''
  };

  constructor(private userSvc: UserService,
              private traineeSvc: TraineeService,
              private pickerSvc: PickerService,
              private employerSvc: EmployerService) {
  }

  ngOnInit() {
    this.user = this.userSvc.isLogin();
    this.traineeSvc.getStatistics().then(res => {
      this.statistics = res;
      this.getData();
    });

    this.employerSvc.getEmployer(this.user.id).then(res => {
      this.employer = res.cust;
      console.log(res);
    });
  }

  getData() {
    // 所在地
    (function (addressCount) {
      const {Global} = F2;
      const data = addressCount;
      const chart = new F2.Chart({
        id: 'addressCount',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data);
      chart.coord({
        transposed: true
      });
      chart.axis('cityname', {
        line: Global._defaultAxis.line,
        grid: null
      });
      chart.axis('num', {
        line: null,
        grid: Global._defaultAxis.grid,
        label(text, index, total) {
          const textCfg = {textAlign: ''};
          if (index === 0) {
            textCfg.textAlign = 'left';
          }
          if (index === total - 1) {
            textCfg.textAlign = 'right';
          }
          return textCfg;
        }
      });
      chart.legend(false);
      chart.interval().position('cityname*num').color('cityname');

      // 绘制文本
      data.map(obj => {
        chart.guide().text({
          position: [obj.cityname, obj.num],
          content: obj.num,
          style: {
            textAlign: 'start'
          },
          offsetX: 10
        });
      });
      chart.render();
    })(this.statistics.addressCount);

    // 意向城市
    (function (allintentionalCityCount) {

      // num: 58, intentionalCity: "其他"

      const _data = [];
      let total = 0;
      allintentionalCityCount.forEach(item => {
        const obj = {name: item.intentionalCity, percent: item.num, a: '1'};
        total = total + item.num;
        _data.push(obj);
      });

      const __data = [];
      const map = {};

      _data.forEach(item => {
        if (total === 0) {
          const obj = {name: item.name, percent: 0, a: '1'};
          __data.push(obj);
          map[item.name] = 0 + '%';
        } else {
          const obj = {name: item.name, percent: item.percent / total, a: '1'};
          __data.push(obj);
          map[item.name] = (item.percent / total * 100).toFixed(2) + '%';
        }
      });


      const data = __data;
      const chart = new F2.Chart({
        id: 'allintentionalCityCount',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data, {
        percent: {
          formatter(val) {
            return val * 100 + '%';
          }
        }
      });
      chart.legend({
        position: 'right',
        itemFormatter(val) {
          return val + '  ' + map[val];
        }
      });
      chart.tooltip(true);
      chart.coord('polar', {
        transposed: true,
        radius: 0.85
      });
      chart.axis(false);
      chart.interval()
        .position('a*percent')
        .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
        .animate({
          appear: {
            duration: 1200,
            easing: 'bounceOut'
          }
        });

      chart.render();
    })(this.statistics.allintentionalCityCount);

    // 学历
    (function (educationCount) {
      const data = educationCount;
      const chart = new F2.Chart({
        id: 'educationCount',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.legend(false);
      chart.interval().position('education*num').color('education');

      // 绘制文本
      data.map(obj => {
        chart.guide().text({
          position: [obj.education, obj.num],
          content: obj.num,
          style: {
            textAlign: 'center',
            textBaseline: 'bottom'
          },
          offsetY: -10
        });
      });
      chart.render();
    })(this.statistics.educationCount);

    // 年龄
    (function (ageCount) {
      const data = ageCount;
      const chart = new F2.Chart({
        id: 'ageCount',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.legend(false);
      chart.interval().position('age*num').color('age');
      // 绘制文本
      data.map(obj => {
        chart.guide().text({
          position: [obj.age, obj.num],
          content: obj.num,
          style: {
            textAlign: 'center',
            textBaseline: 'bottom'
          },
          offsetY: -10
        });
      });
      chart.render();
    })(this.statistics.ageCount);

    // 兵龄
    (function (soldierAgeCount) {
      const data = soldierAgeCount;
      const chart = new F2.Chart({
        id: 'soldierAgeCount',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.legend(false);
      chart.interval().position('soldierAge*num').color('soldierAge');
      // 绘制文本
      data.map(obj => {
        chart.guide().text({
          position: [obj.soldierAge, obj.num],
          content: obj.num,
          style: {
            textAlign: 'center',
            textBaseline: 'bottom'
          },
          offsetY: -10
        });
      });
      chart.render();
    })(this.statistics.soldierAgeCount);

    // 驾照
    (function (drivingLicenceCount) {
      const data = drivingLicenceCount;
      const chart = new F2.Chart({
        id: 'drivingLicenceCount',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.legend(false);
      chart.interval().position('drivingLicence*num').color('drivingLicence');
      // 绘制文本
      data.map(obj => {
        chart.guide().text({
          position: [obj.drivingLicence, obj.num],
          content: obj.num,
          style: {
            textAlign: 'center',
            textBaseline: 'bottom'
          },
          offsetY: -10
        });
      });
      chart.render();
    })(this.statistics.drivingLicenceCount);

    // 驾龄
    (function (driversAgeCount) {

      const _data = [];
      let total = 0;
      driversAgeCount.forEach(item => {
        const obj = {name: item.driversAge, percent: item.num, a: '1'};
        total = total + item.num;
        _data.push(obj);
      });

      const __data = [];
      const map = {};

      _data.forEach(item => {
        if (total === 0) {
          const obj = {name: item.name, percent: 0, a: '1'};
          __data.push(obj);
          map[item.name] = 0 + '%';
        } else {
          const obj = {name: item.name, percent: item.percent / total, a: '1'};
          __data.push(obj);
          map[item.name] = (item.percent / total * 100).toFixed(2) + '%';
        }
      });

      const data = __data;
      const chart = new F2.Chart({
        id: 'driversAgeCount',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      });
      chart.source(data, {
        percent: {
          formatter(val) {
            return val * 100 + '%';
          }
        }
      });
      chart.legend({
        position: 'right',
        itemFormatter(val) {
          return val + '  ' + map[val];
        }
      });
      chart.tooltip(false);
      chart.coord('polar', {
        transposed: true,
        radius: 0.85
      });
      chart.axis(false);
      chart.interval()
        .position('a*percent')
        .color('name', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'])
        .adjust('stack')
        .style({
          lineWidth: 1,
          stroke: '#fff',
          lineJoin: 'round',
          lineCap: 'round'
        })
        .animate({
          appear: {
            duration: 1200,
            easing: 'bounceOut'
          }
        });

      chart.render();
    })(this.statistics.driversAgeCount);

    // 身高
    (function (heightCount) {
      const data = heightCount;
      const chart = new F2.Chart({
        id: 'heightCount',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.legend(false);
      chart.interval().position('height*num').color('height');
      // 绘制文本
      data.map(obj => {
        chart.guide().text({
          position: [obj.height, obj.num],
          content: obj.num,
          style: {
            textAlign: 'center',
            textBaseline: 'bottom'
          },
          offsetY: -10
        });
      });
      chart.render();
    })(this.statistics.heightCount);

    // 体重
    (function (weightCount) {
      const data = weightCount;
      const chart = new F2.Chart({
        id: 'weightCount',
        width: window.innerWidth,
        height: window.innerWidth > window.innerHeight ? (window.innerHeight - 54) : window.innerWidth * 0.707,
        pixelRatio: window.devicePixelRatio
      });

      chart.source(data, {
        sales: {
          tickCount: 5
        }
      });
      chart.legend(false);
      chart.interval().position('weight*num').color('weight');
      // 绘制文本
      data.map(obj => {
        chart.guide().text({
          position: [obj.weight, obj.num],
          content: obj.num,
          style: {
            textAlign: 'center',
            textBaseline: 'bottom'
          },
          offsetY: -10
        });
      });
      chart.render();
    })(this.statistics.weightCount);
  }

  onPickerShow(type) {
    this.pickerSvc.showDateTime('date').subscribe(res => {
      this.pickerDate[type] = res.formatValue;

      console.log(this.pickerDate);

      if (this.pickerDate.start && this.pickerDate.end) {
        this.traineeSvc.getStatistics(this.pickerDate.start, this.pickerDate.end).then(_res => {
          this.statistics = _res;
          console.log(this.statistics);
          this.getData();
        });
      }
    });
  }
}
