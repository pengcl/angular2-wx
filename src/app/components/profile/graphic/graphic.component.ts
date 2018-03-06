import {Component, Input, OnInit} from '@angular/core';

declare var F2: any;

@Component({
  selector: 'app-profile-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss']
})
export class ProfileGraphicComponent implements OnInit {
  @Input() score;

  constructor() {
  }

  ngOnInit() {

    F2.Global.pixelRatio = window.devicePixelRatio;
    const data = this.score.scores;

    const chart = new F2.Chart({
      id: 'mountNode'
    });

    chart.coord('polar');
    chart.source(data, {
      value: {
        min: 0,
        tickInterval: 20
      }
    });


    // 配置刻度文字大小，供PC端显示用(移动端可以使用默认值20px)
    chart.axis('props', {
      label: {
        fontSize: 12
      },
      line: null
    });
    chart.axis('value', {
      label: null,
      line: null
    });

    chart.area().position('props*value').color('name').style({
      opacity: 0.6,
      background: '#FBA703'
    });
    // x和y轴同时缩放的动画
    chart.animate({
      type: 'scalexy'
    });
    chart.render();

  }

}
