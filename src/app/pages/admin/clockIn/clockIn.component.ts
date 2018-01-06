import {Component, OnInit} from '@angular/core';
import {PageConfig} from './page.config';
import {WXService} from '../../../services/wx.service';
import {UserService} from '../../../services/user.service';
import {MoService} from '../../../services/mo.service';
import {GeoService} from '../../../services/geo.service';

declare var mojs: any;
declare var $: any;
declare var qq: any;

@Component({
  selector: 'app-admin-clock-in',
  templateUrl: './clockIn.component.html',
  styleUrls: ['./clockIn.component.scss']
})
export class AdminClockInComponent implements OnInit {
  tabBarConfig = PageConfig.tabBar;
  navBarConfig = PageConfig.navBar;
  clocked: boolean = false;
  clocking: boolean = false;

  userId: string;
  user: any;

  location: any = {
    location: String,
    address: String
  };

  constructor(private geo: GeoService, private wx: WXService, private userSvc: UserService, private moSvc: MoService) {
  }

  clockIn(e): void {
    this.clocking = true;
    this.clocked = true;
  }

  ngOnInit() {
    if (this.wx.isWx()) {
      this.userId = this.userSvc.isLogin();
      this.userSvc.getUser(this.userId).then(user => {
        this.user = user;
      });
    }

    this.geo.get().then((res) => {
      const geolocation = new qq.maps.Geolocation('PDBBZ-2NVWV-7GAPA-UKVP5-YED6S-FRB6L', 'danius');
      geolocation.getLocation((position) => {
        const markUrl = 'https://apis.map.qq.com/tools/poimarker' +
          '?marker=coord:' + position.lat + ',' + position.lng +
          ';title:我的位置;addr:' + (position.addr || position.city) +
          '&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp';
        document.getElementById('markPage').src = markUrl;

        this.location.location = position.lat + ',' + position.lng;

        this.geo.getPosition(this.location.location).then((result) => {
          this.location.address = result.result.address;

          console.log(this.location);
        });
      });
    });

    /*this.geo.getLocation(function (position) {
      console.log(position);
    });*/

    /*this.moSvc.get().then((res) => {

      const location = document.getElementById('location');
      const locationIcon = document.getElementById('locationIcon');

      const cx = location.offsetWidth / 2;
      const cy = location.offsetHeight / 2;

      const px = cx;
      const py = cy + locationIcon.offsetHeight / 2;

      const circleBig = new mojs.Shape({
        left: cx, top: cy,
        radius: 100,
        stroke: '#f8f8f8',
        fill: 'none',
        strokeWidth: {10: 0, easing: 'cubic.out'},
        strokeLinecap: 'round',
        scale: {0: 3},
        duration: 600,
        easing: 'quad.out'
      });

      const locationPin = new mojs.Shape({
        left: px, top: py,
        radiusX: 100,
        radiusY: 15,
        stroke: '#999999',
        isShowStart: true,
        fill: 'none',
        strokeDasharray: '60% 40%',
        strokeDashoffset: '7%',
        strokeWidth: {10: 0, easing: 'cubic.in'},
        strokeLinecap: 'round',
        scale: {0: 1}
      });

      const timeline = new mojs.Timeline;

      timeline.add(circleBig, locationPin);

      document.addEventListener('click', function (e) {
        timeline.play();
      });

    });*/
  }

}
